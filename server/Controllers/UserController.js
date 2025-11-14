import { json } from "express";
import { Svix, Webhook } from "svix";
import userModel from "../Models/UserModel.js";
import mongoose from "mongoose";
import razorpay from 'razorpay'
import transactionModel from "../Models/TransactionModel.js";

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
          creditBalance: 5,
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




// api controller function to get user avaiable credit data

const userCredit = async (req, res) => {
  try {
    const clerkId = req.clerkId;

    if (!clerkId) {
      return res.status(400).json({ success: false, message: "Clerk user id missing" })
    }

    const userData = await userModel.findOne({ clerkId })

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" })
    }

    // Ensure default credit value of 5 if creditBalance is missing
    const credits = userData.creditBalance !== undefined && userData.creditBalance !== null ? userData.creditBalance : 5;

    res.json({ success: true, credits: credits })
  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}


// getway initialization

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

const initializeGetway = async (req, res) => {
  // Gateway initialization logic can go here if needed
  res.json({ success: true, message: "Gateway initialized" })
}

// api to make paryment for credits

const payemtRazorpay = async (req, res) => {
  try {
    const clerkId = req.clerkId // Get from Auth middleware
    const { planId } = req.body
    const userData = await userModel.findOne({ clerkId })
    if (!userData || !planId) {
      return res.status(400).json({ success: false, message: "Invalid request" })
    }
    let credits, plan, amount, date
    switch (planId) {
      case 'Basic':
        credits = 100
        plan = 'Basic'
        amount = 10
        break
      case 'Advanced':
        credits = 500
        plan = 'Advanced'
        amount = 50
        break
      case 'Business':
        credits = 5000
        plan = 'Business'
        amount = 250
        break
      default:
        return res.status(400).json({ success: false, message: "Invalid plan selected" })
    }
    date = new Date(Date.now())


    //creating transaction 
    const transactionData = {
      clerkId,
      plan,
      amount,
      credits,
      date
    }
    const transaction = await transactionModel.create(transactionData)

    const options={
      amount:amount*100,
      currency:process.env.CURRENCY || 'USD',
      receipt:transaction._id.toString(),
      
    }
    
    try {
      const order = await razorpayInstance.orders.create(options)
      return res.json({success:true,order})
    } catch (razorpayError) {
      console.log(razorpayError.message)
      return res.status(500).json({success:false,message:razorpayError.message})
    }


  } catch (error) {
    console.log(error.message)
    res.status(500).json({ success: false, message: error.message })
  }
}


// api controller function to verify razorpay payment

const verifyRazorpayPayment = async (req, res) => {

  try {
    const clerkId = req.clerkId // Get from Auth middleware
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body

    if(!razorpay_order_id){
      return res.status(400).json({success:false,message:'Order ID is required'})
    }

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    
    // Check if order is paid
    if(orderInfo.status === 'paid'){
      // Find transaction using receipt (which is the transaction _id)
      const transactionData = await transactionModel.findById(orderInfo.receipt)
      
      if(!transactionData){
        return res.status(404).json({success:false,message:'Transaction not found'})
      }

      // Verify the transaction belongs to the authenticated user
      if(transactionData.clerkId !== clerkId){
        return res.status(403).json({success:false,message:'Unauthorized access'})
      }

      // Check if payment already processed (avoid double crediting)
      if(transactionData.payment){
        return res.json({success:false,message:'Payment already processed'})
      }

      // Add credits to user
      const userData = await userModel.findOne({clerkId:transactionData.clerkId})
      if(!userData){
        return res.status(404).json({success:false,message:'User not found'})
      }

      const newCreditBalance = (userData.creditBalance || 0) + transactionData.credits
      await userModel.findByIdAndUpdate(userData._id,{creditBalance:newCreditBalance})
     
      // Mark payment as processed
      await transactionModel.findByIdAndUpdate(transactionData._id,{payment:true})
      
      return res.json({success:true,message:"Credits added successfully", credits: newCreditBalance})
    } else {
      return res.status(400).json({success:false,message:`Order status is ${orderInfo.status}, not paid`})
    }


  } catch (error) {
    console.log(error.message)
    res.status(500).json({success:false,message:error.message})
  }
}



export { clkerWebhooks, userCredit, initializeGetway, payemtRazorpay, verifyRazorpayPayment };