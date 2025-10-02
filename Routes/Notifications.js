import express from "express";
const router = express.Router();

// Dummy notification list (test data)
let notifications = [
  { id: 1, message: "New booking received!", date: new Date() },
  { id: 2, message: "Your profile was viewed.", date: new Date() },
];

// GET all notifications
router.get("/", (req, res) => {
  res.json(notifications);
});

// ADD notification
router.post("/", (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const newNotification = {
    id: notifications.length + 1,
    message,
    date: new Date(),
  };

  notifications.push(newNotification);
  res.status(201).json(newNotification);
});

// DELETE notification by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  notifications = notifications.filter(n => n.id !== parseInt(id));
  res.json({ success: true });
});

export default router;
