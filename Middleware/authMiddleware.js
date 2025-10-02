import express from "express";
import cors from "cors";

const app = express();

// Allow all local dev ports (or just your port)
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
