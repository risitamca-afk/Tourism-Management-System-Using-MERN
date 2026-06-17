import express from "express";
const router = express.Router();
import {
  getTrains,
  addTrain,
  addSampleTrains,
} from "../controllers/trainController.js";

// GET trains based on filters
router.get("/trains", getTrains);

// POST route to add a new train manually
router.post("/trains", addTrain);

// POST route to add sample trains (optional, for DB seeding)
router.post("/trains/sample", addSampleTrains);

export default router;
