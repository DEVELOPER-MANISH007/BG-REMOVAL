import express from "express";
import cors from "cors";
import connectDB from "./Config/db.js";
import dotenv from "dotenv";




// app congfig
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// Database connection
dotenv.config();
connectDB();



// API routes
app.get("/", (req, res) => {
    res.send("Server is running");
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
