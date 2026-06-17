import express from "express";
const router = express.Router();
import {
  createTrainBooking,
  getAllTrainBookings,
  cancelTrainBooking,
} from "../controllers/trainBookingController.js";

// Routes
router.post("/train-booking", createTrainBooking);
router.get("/train-bookings", getAllTrainBookings);
router.delete("/train-bookings/:trainId", cancelTrainBooking);

export default router;
