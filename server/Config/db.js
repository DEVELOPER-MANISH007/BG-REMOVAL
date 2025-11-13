import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();



const connectDB = async () => {
    try {
       // Check if MONGODB_URI is set
       if (!process.env.MONGODB_URI) {
           console.error("Error: MONGODB_URI environment variable is not set");
           process.exit(1);
       }

       mongoose.connection.on("connected",()=>{
        console.log("Connected to MongoDB");
       });
       mongoose.connection.on("error",(error)=>{
        console.log("MongoDB connection error:", error.message);
       });

       // Construct connection string properly
       const mongoURI = process.env.MONGODB_URI;
       const dbName = "bg-removal";
       
       // Check if URI already has a database name
       let connectionString;
       if (mongoURI.includes('mongodb.net/') || mongoURI.includes('mongodb.net?')) {
           // URI already has database name or query params, replace it
           connectionString = mongoURI.replace(/mongodb\.net\/[^?]*/, `mongodb.net/${dbName}`);
       } else if (mongoURI.endsWith('/')) {
           connectionString = `${mongoURI}${dbName}`;
       } else {
           connectionString = `${mongoURI}/${dbName}`;
       }

       console.log("Attempting to connect to MongoDB...");
       await mongoose.connect(connectionString);
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        process.exit(1);
    }
}
export default connectDB;