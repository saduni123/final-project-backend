// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Routes
import authRoutes from "./routes/auth.js";
import photographerDetailsRoutes from "./routes/photographerDetails.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/photographer-details", photographerDetailsRoutes);

// ✅ MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/photographyDB")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Test endpoint
app.get("/", (req, res) => res.send("🚀 Server is running"));

// ✅ Start server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
