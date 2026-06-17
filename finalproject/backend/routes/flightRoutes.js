import express from "express";
const router = express.Router();
import {
  getFlights,
  addSampleFlights,
  saveFlight,
  updateFlight,
  deleteFlight,
  fetchFlights,
} from "../controllers/flightController.js";

router.get("/flights", getFlights);
router.get("/flightfetch", fetchFlights);
router.post("/flights", saveFlight); // Route to save a new flight
router.post("/flights/sample", addSampleFlights);
router.put("/updateflights/:id", updateFlight);
router.delete("/deleteflights/:id", deleteFlight);

export default router;
