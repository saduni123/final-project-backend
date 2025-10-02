import express from "express";
import { addPhotographerDetails, getPhotographerDetails } from "../controllers/photographerDetailsController.js";

const router = express.Router();

// POST: add/update details
router.post("/", addPhotographerDetails);

// GET: get existing details
router.get("/:photographerId", getPhotographerDetails);

export default router;
