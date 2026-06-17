import express from "express";
const router = express.Router();
import {createCabBooking,getAllCabBookings,cancelCabBooking} from "../controllers/cabBookingController.js";

// POST: Create a booking
router.post("/", createCabBooking);

// GET: Fetch all bookings
router.get("/", getAllCabBookings);

// DELETE: Cancel booking by CabId
router.delete("/:CabId", cancelCabBooking);

export default router;
