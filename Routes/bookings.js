import express from "express";
import Booking from "../models/Booking.js ";

const router = express.Router();

// Create a booking
router.post("/", async (req, res) => {
  const { userName, userEmail, date, time, location, photographerId } = req.body;

  if (!userName || !userEmail || !date || !time || !location || !photographerId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newBooking = await Booking.create({
      userName,
      userEmail,
      date,
      time,
      location,
      photographerId
    });
    res.status(201).json({ message: "Booking created", booking: newBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
