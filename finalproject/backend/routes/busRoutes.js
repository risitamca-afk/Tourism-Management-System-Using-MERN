import express from "express";
const router = express.Router();
import { addBus, getBuses } from "../controllers/busController.js";

// POST route to add new bus data
router.post("/buses", addBus);

// GET route to fetch buses based on query parameters
router.get("/buses", getBuses);

export default router;
