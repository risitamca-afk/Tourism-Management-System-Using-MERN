import express from "express";
const router = express.Router();
import { getAllRestaurants } from "../controllers/restaurantController.js";

// Route to get all restaurants
router.get("/", getAllRestaurants);

export default router;
