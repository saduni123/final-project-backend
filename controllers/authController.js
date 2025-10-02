// controllers/authController.js
import User from "../models/User.js";
import Photographer from "../models/Photographer.js";
import bcrypt from "bcryptjs";

// ---------------- Register ----------------
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "photographer") {
      const exist = await Photographer.findOne({ email: normalizedEmail });
      if (exist) {
        return res.status(400).json({ message: "Photographer already exists" });
      }

      const newPhotographer = new Photographer({
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role: "photographer",
      });

      await newPhotographer.save();
      return res.status(201).json({
        message: "Photographer registered",
        user: {
          id: newPhotographer._id,
          name: newPhotographer.name,
          email: newPhotographer.email,
          role: newPhotographer.role,
        },
      });
    }

    // default: normal user
    const exist = await User.findOne({ email: normalizedEmail });
    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();
    return res.status(201).json({
      message: "User registered",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });

  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Login ----------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 🔎 Try User first
    let user = await User.findOne({ email: normalizedEmail });
    let role = "user";

    if (!user) {
      // 🔎 Try Photographer
      user = await Photographer.findOne({ email: normalizedEmail });
      role = "photographer";
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ Return clean user object (avoid sending hashed password)
    return res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role,
      },
    });

  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
