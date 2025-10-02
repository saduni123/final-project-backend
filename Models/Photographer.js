import mongoose from "mongoose";

const PhotographerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "photographer" },
  price: { type: Number, default: 0 },
  details: [
    {
      title: String,
      description: String,
      contact: String,
      date: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

export default mongoose.model("Photographer", PhotographerSchema);
