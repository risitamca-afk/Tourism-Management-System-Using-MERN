import express from "express";
const router = express.Router();
import { getBookedSeats, bookSeats } from "../controllers/flightSeatController.js";

// Get booked seats for a flight
router.get("/flight-seats/:flightId", getBookedSeats);

// Book seats for a flight
router.post("/flight-seats/book", bookSeats);

export default router;
