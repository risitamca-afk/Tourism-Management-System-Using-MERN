import express from "express";
import {
  createHotelBooking,
  deleteHotelBooking,
  getAllHotelBookings,
  
} from "../controllers/hotel.booking.controller.js";

const router = express.Router();

router.post("/hotel-bookings", createHotelBooking);
router.get("/all-hotel-bookings", getAllHotelBookings);
router.delete("/deletehotel-booking/:id", deleteHotelBooking);
export default router;
