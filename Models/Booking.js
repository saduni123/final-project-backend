import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
  photographerId: { type: mongoose.Schema.Types.ObjectId, ref: "Photographer", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  hours: { type: Number, required: true },
  message: String,
  status: { type: String, enum: ["pending", "confirmed", "rejected"], default: "pending" }
}, { timestamps: true })

export default mongoose.model("Booking", bookingSchema)
