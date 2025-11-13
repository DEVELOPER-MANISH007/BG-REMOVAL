import { json } from "express";
import { Svix, Webhook } from "svix";
import userModel from "../Models/UserModel.js";
import mongoose from "mongoose";

// API controller to manage clerk user wtih database
// http://localhost:4000/api/user/webooks

const clkerWebhooks = async (req, res) => {
  try {
    // crerate a svix istance wqith clerk webhooks
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const payload =
      req.rawBody ||
      (typeof req.body === "string"
        ? req.body
        : Buffer.isBuffer(req.body)
        ? req.body.toString("utf8")
        : JSON.stringify(req.body));

    const evt = await whook.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
    const { data, type } = evt;
    console.log(
      "Webhook received - Type:",
      type,
      "Data:",
      JSON.stringify(data, null, 2)
    );

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };
        console.log("Creating user with data:", userData);
        const createdUser = await userModel.create(userData);
        console.log("User created successfully:", createdUser);
        res.json({ success: true, message: "User created", user: createdUser });

        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };
        console.log("Updating user with data:", userData);
        const updatedUser = await userModel.findOneAndUpdate(
          { clerkId: data.id },
          userData,
          { new: true }
        );
        console.log("User updated successfully:", updatedUser);
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
    console.error("Webhook error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message, error: error.stack });
  }
};
export { clkerWebhooks };
