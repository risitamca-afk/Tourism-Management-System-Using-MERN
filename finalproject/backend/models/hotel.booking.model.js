import mongoose from "mongoose";

const hotelBookingSchema = new mongoose.Schema({
  username: String,
  hotelId: { type: mongoose.Schema.Types.ObjectId, required: true },
  hotelName: String,
  Place: String,
  roomType: String,
  roomCount: Number,
  paymentId: { type: String, required: true, unique: true },
  checkInDate: Date,
  checkOutDate: Date,
});

export const HotelBooking = mongoose.model("HotelBooking", hotelBookingSchema);
