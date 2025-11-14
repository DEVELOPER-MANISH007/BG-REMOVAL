import express from "express";
import { initializeGetway, payemtRazorpay, verifyRazorpayPayment } from "../Controllers/UserController.js";

import { clkerWebhooks, userCredit } from "../Controllers/UserController.js";
import authUser from "../Middlewares/Auth.js";

const UserRouter = express.Router();

UserRouter.post("/webhooks", clkerWebhooks);
UserRouter.get('/credits',authUser,userCredit)
UserRouter.post('/payment-razorpay',authUser,payemtRazorpay)
UserRouter.post('/verify-razorpay-payment',authUser,verifyRazorpayPayment)


export default UserRouter;