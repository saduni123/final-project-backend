import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  photographerId: String,
  date: Date,
  hours: Number,
  message: String
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
