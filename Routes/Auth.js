// routes/auth.js
import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// ✅ Register User
// POST http://localhost:5000/api/auth/register
router.post("/register", registerUser);

// ✅ Login User
// POST http://localhost:5000/api/auth/login
router.post("/login", loginUser);

export default router;
