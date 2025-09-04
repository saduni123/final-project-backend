// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";                // ✅ CORS import
import authRoutes from "./Routes/Auth.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());                        // ✅ Allow all origins
app.use(express.json());                // Parse JSON request body

// Routes
app.use("/api/auth", authRoutes);

// MongoDB Connection
const MONGO_URI = "mongodb://127.0.0.1:27017/photographyApp";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Optional root route
app.get("/", (req, res) => {
  res.send("Server is running!");
});
