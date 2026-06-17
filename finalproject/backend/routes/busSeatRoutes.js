import express from "express";
const router = express.Router();
import { getBookedSeats, bookSeats } from "../controllers/busSeatController.js";

// Get all booked seats for a specific bus
router.get("/:busId", getBookedSeats);

// Book selected seats for a bus
router.post("/book", bookSeats);

export default router;
