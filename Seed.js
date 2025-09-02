import dotenv from "dotenv"
import mongoose from "mongoose"
import connectDB from "./Config/Db.js"
import Photographer from "./Models/Photographer.js"

dotenv.config()
await connectDB()

const sample = [
  {
    name: "Kamal Perera",
    location: "Colombo",
    min_budget: 20000,
    max_budget: 80000,
    bio: "Wedding and event photographer with 10 years experience",
    avatar_url: "https://randomuser.me/api/portraits/men/32.jpg",
    portfolio: [
      { image_url: "https://images.unsplash.com/photo-1511765224389-cb65c8d2d6b4", caption: "Wedding moment" },
      { image_url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4", caption: "Couple shoot" }
    ]
  },
  {
    name: "Nimali Silva",
    location: "Kandy",
    min_budget: 15000,
    max_budget: 50000,
    bio: "Portraits and lifestyle shoots",
    avatar_url: "https://randomuser.me/api/portraits/women/44.jpg",
    portfolio: [
      { image_url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f", caption: "Outdoor portrait" }
    ]
  }
]

await Photographer.deleteMany()
await Photographer.insertMany(sample)

console.log("✅ Sample photographers inserted")
mongoose.connection.close()
