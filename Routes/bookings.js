import express from "express"
import Booking from "../Models/Booking.js"
import { protect } from "../Middleware/authMiddleware.js"

const router = express.Router()

// boking karanawa
router.post("/", protect, async (req, res) => {
  try {
    const booking = await Booking.create({
      photographerId: req.body.photographerId,
      userId: req.user._id,
      date: req.body.date,
      hours: req.body.hours,
      message: req.body.message
    })
    res.status(201).json(booking)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// user bookings gnna eka
router.get("/my", protect, async (req, res) => {
  const bookings = await Booking.find({ userId: req.user._id }).populate("photographerId", "name location")
  res.json(bookings)
})

export default router
