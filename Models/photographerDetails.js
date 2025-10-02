// routes/photographerDetails.js
import express from "express";
import PhotographerDetails from "../models/PhotographerDetails.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { photographerId, name, email, contact, address, price } = req.body;

    if (!photographerId) {
      return res.status(400).json({ message: "Photographer ID required" });
    }

    // Insert or Update existing details
    const details = await PhotographerDetails.findOneAndUpdate(
      { photographerId },               // Match by photographerId
      { photographerId, name, email, contact, address, price },
      { new: true, upsert: true }       // upsert: insert if not exists
    );

    res.json(details);
  } catch (err) {
    console.error("❌ Error saving details:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
