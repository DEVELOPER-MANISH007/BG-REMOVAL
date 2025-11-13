import { json } from "express";
import { Svix, Webhook } from "svix";
import mongoose from "mongoose";
import userModel from "../Models/UserModel.js";

// API controller to manage clerk user wtih database
// http://localhost:4000/api/user/webooks

const clkerWebhooks = async (req, res) => {
  try {
    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      console.error("❌ MongoDB not connected! State:", mongoose.connection.readyState);
      return res.status(503).json({ success: false, message: "Database not connected" });
    }
    console.log("✅ MongoDB connected - Database:", mongoose.connection.db?.databaseName);

    // crerate a svix istance wqith clerk webhooks
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["Svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
    const { data, type } = req.body;
    console.log("📥 Webhook received - Type:", type);
    console.log("📦 Full webhook data:", JSON.stringify(req.body, null, 2));

    switch (type) {
      case "user.created": {
        // Validate email_addresses
        if (!data.email_addresses || !Array.isArray(data.email_addresses) || data.email_addresses.length === 0) {
          console.error("❌ Invalid email_addresses:", data.email_addresses);
          return res.status(400).json({ success: false, message: "Email addresses not found" });
        }

        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          photo: data.image_url || "",
        };
        console.log("📝 Creating user with data:", userData);
        
        try {
          const createdUser = await userModel.create(userData);
          console.log("✅ User created successfully in DB:", createdUser);
          res.json({ success: true, message: "User created", user: createdUser });
        } catch (createError) {
          console.error("❌ Error creating user:", createError);
          if (createError.code === 11000) {
            console.log("⚠️ User already exists, trying to find...");
            const existingUser = await userModel.findOne({ clerkId: data.id });
            console.log("👤 Existing user:", existingUser);
            return res.json({ success: true, message: "User already exists", user: existingUser });
          }
          throw createError;
        }

        break;
      }
      case "user.updated": {
        // Validate email_addresses
        if (!data.email_addresses || !Array.isArray(data.email_addresses) || data.email_addresses.length === 0) {
          console.error("❌ Invalid email_addresses:", data.email_addresses);
          return res.status(400).json({ success: false, message: "Email addresses not found" });
        }

        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          photo: data.image_url || "",
        };
        console.log("📝 Updating user with data:", userData);
        const updatedUser = await userModel.findOneAndUpdate(
          { clerkId: data.id },
          userData,
          { new: true }
        );
        console.log("✅ User updated successfully:", updatedUser);
        res.json({ success: true, message: "User updated", user: updatedUser });
        break;
      }
      case "user.deleted": {
        console.log("Deleting user with clerkId:", data.id);
        const deletedUser = await userModel.findOneAndDelete({
          clerkId: data.id,
        });
        console.log("User deleted successfully:", deletedUser);
        res.json({ success: true, message: "User deleted", user: deletedUser });

        break;
      }
      default:
        console.log("Unknown webhook type:", type);
        res.json({ success: false, message: `Unknown webhook type: ${type}` });
    }
  } catch (error) {
    console.error("❌ Webhook error:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    res
      .status(500)
      .json({ success: false, message: error.message, error: error.stack });
  }
};

// Test endpoint to check database connection and create test user
const testDB = async (req, res) => {
  try {
    console.log("🧪 Testing database connection...");
    const connectionState = mongoose.connection.readyState;
    const states = { 0: "disconnected", 1: "connected", 2: "connecting", 3: "disconnecting" };
    
    console.log("Connection state:", states[connectionState], "(", connectionState, ")");
    console.log("Database name:", mongoose.connection.db?.databaseName);
    
    if (connectionState !== 1) {
      return res.status(503).json({ 
        success: false, 
        message: "Database not connected", 
        state: states[connectionState] 
      });
    }

    // Try to count users
    const userCount = await userModel.countDocuments();
    console.log("Total users in DB:", userCount);

    // Try to find all users
    const allUsers = await userModel.find({});
    console.log("All users:", allUsers);

    res.json({
      success: true,
      message: "Database connection OK",
      connectionState: states[connectionState],
      database: mongoose.connection.db?.databaseName,
      userCount,
      users: allUsers
    });
  } catch (error) {
    console.error("❌ Test DB error:", error);
    res.status(500).json({ success: false, message: error.message, error: error.stack });
  }
};

export { clkerWebhooks, testDB };
