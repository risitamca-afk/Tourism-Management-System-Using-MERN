import express from "express";
import {
  fetchHotels,
  addHotel,
  editHotel,
  deleteHotel,
} from "../controllers/hotel.controller.js";

const router = express.Router();

router.post("/hoteladd", addHotel);
router.get("/hotelfetch", fetchHotels);
router.put("/edithotel/:id", editHotel);
router.delete("/hoteldelete/:id", deleteHotel);

export default router;
