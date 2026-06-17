import express from "express";
import {
  createPackageBooking,
  getAllBookings,
  getBookingById,
  deletePackageBooking, // <- Import here
} from "../controllers/packagebooking.controller.js";

const router = express.Router();

router.post("/addpackagebooking", createPackageBooking);
router.get("/all-package-bookings", getAllBookings);
router.get("/getpackage-booking/:id", getBookingById);
router.delete("/deletepackage-booking/:id", deletePackageBooking); // <- Add this route
export default router;
