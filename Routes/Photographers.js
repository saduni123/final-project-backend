import express from "express";
const router = express.Router();


router.post("/", (req, res) => {
  const newPhotographer = req.body;
  // save to DB or just return
  res.status(201).json({
    message: "Photographer added successfully!",
    photographer: newPhotographer,
  });
});

export default router;
