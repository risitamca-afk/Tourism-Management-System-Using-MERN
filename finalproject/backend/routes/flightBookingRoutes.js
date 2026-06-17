import express from "express";
import {
  createFlightBooking,
  getAllFlightBookings,
  deleteFlightBooking,
} from "../controllers/flightBookingController.js";

const router = express.Router();

router.post("/flight-bookings", createFlightBooking);
router.get("/flight-bookings", getAllFlightBookings);
router.delete("/flight-bookings/:flightId", deleteFlightBooking);

export default router;
