import express from "express";
const router = express.Router();
import {
  createBusBooking,
  getAllBusBookings,
  cancelBusBooking,
} from "../controllers/busBookingController.js";

router.post("/bus-bookings", createBusBooking);
router.get("/bus-bookings", getAllBusBookings);
router.delete("/bus-bookings/:BusId", cancelBusBooking);

export default router;
