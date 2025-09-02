import mongoose from "mongoose"

const portfolioSchema = new mongoose.Schema({
  image_url: String,
  caption: String
})

const photographerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  min_budget: Number,
  max_budget: Number,
  bio: String,
  avatar_url: String,
  portfolio: [portfolioSchema]
}, { timestamps: true })

export default mongoose.model("Photographer", photographerSchema)
