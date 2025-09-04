import express from "express";
import Booking from "../Models/Booking.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

// Create booking
router.post("/", authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.create({
      user: req.user.id,
      photographerId: req.body.photographerId,
      date: req.body.date,
      hours: req.body.hours,
      message: req.body.message
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get bookings
router.get("/", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
