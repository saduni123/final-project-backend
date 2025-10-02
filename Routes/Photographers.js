// routes/photographers.js
import express from "express";
import bcrypt from "bcryptjs";
import Photographer from "../models/Photographer.js";

const router = express.Router();

/**
 * ✅ Register Photographer
 * POST /api/photographers/register
 */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const normalizedEmail = email.toLowerCase().trim();
    const exist = await Photographer.findOne({ email: normalizedEmail });
    if (exist) return res.status(400).json({ message: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);
    const newPhotographer = new Photographer({ name, email: normalizedEmail, password: hash });
    const savedPhotographer = await newPhotographer.save();

    // avoid sending password back
    const { password: pwd, ...rest } = savedPhotographer._doc;
    res.status(201).json(rest);
  } catch (err) {
    console.error("Photographer register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ✅ Login Photographer
 * POST /api/photographers/login
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const normalizedEmail = email.toLowerCase().trim();
    const photographer = await Photographer.findOne({ email: normalizedEmail });
    if (!photographer) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, photographer.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const { password: pwd, ...rest } = photographer._doc;
    res.status(200).json(rest);
  } catch (err) {
    console.error("Photographer login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ✅ Get All Photographers
 * GET /api/photographers
 */
router.get("/", async (req, res) => {
  try {
    const photographers = await Photographer.find().select("-password"); // hide password
    res.json(photographers);
  } catch (err) {
    console.error("Get all photographers error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ✅ Add Detail
 * POST /api/photographers/add-details/:id
 */
router.post("/add-details/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const photographer = await Photographer.findById(id);
    if (!photographer) return res.status(404).json({ message: "Photographer not found" });

    // ensure details array exists
    if (!Array.isArray(photographer.details)) {
      photographer.details = [];
    }

    photographer.details.push(req.body);
    await photographer.save();
    res.json({ details: photographer.details });
  } catch (err) {
    console.error("Add details error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ✅ Update Detail
 * PUT /api/photographers/update-detail/:id/:index
 */
router.put("/update-detail/:id/:index", async (req, res) => {
  const { id, index } = req.params;
  try {
    const photographer = await Photographer.findById(id);
    if (!photographer) return res.status(404).json({ message: "Photographer not found" });

    if (!photographer.details || !photographer.details[index]) {
      return res.status(400).json({ message: "Detail not found at index" });
    }

    photographer.details[index] = req.body;
    await photographer.save();
    res.json({ details: photographer.details });
  } catch (err) {
    console.error("Update details error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ✅ Delete Detail
 * DELETE /api/photographers/delete-detail/:id/:index
 */
router.delete("/delete-detail/:id/:index", async (req, res) => {
  const { id, index } = req.params;
  try {
    const photographer = await Photographer.findById(id);
    if (!photographer) return res.status(404).json({ message: "Photographer not found" });

    if (!photographer.details || !photographer.details[index]) {
      return res.status(400).json({ message: "Detail not found at index" });
    }

    photographer.details.splice(index, 1);
    await photographer.save();
    res.json({ details: photographer.details });
  } catch (err) {
    console.error("Delete details error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ✅ Budget Filter
 * GET /api/photographers/budget?min=100&max=500
 */
router.get("/budget", async (req, res) => {
  try {
    let { min, max } = req.query;
    min = parseInt(min) || 0;
    max = parseInt(max) || 1000000;

    const photographers = await Photographer.find({
      price: { $gte: min, $lte: max }
    }).select("-password");

    res.json(photographers);
  } catch (err) {
    console.error("Budget filter error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
