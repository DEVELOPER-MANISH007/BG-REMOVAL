import express from "express";
import cors from "cors";
import connectDB from "./Config/db.js";
import dotenv from "dotenv";
import UserRouter from "./Routes/userRoutes.js";




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
app.use('/api/user',UserRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
