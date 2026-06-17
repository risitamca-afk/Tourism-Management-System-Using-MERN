import mongoose from "mongoose";

const busBookingSchema = new mongoose.Schema({
  BusId: { type: mongoose.Schema.Types.ObjectId, required: true },
  busName: String,
  busNumber: String,
  from: String,
  to: String,
  departureTime: String,
  arrivalTime: String,
  date: Date,
  paymentId: { type: String, required: true, unique: true }
});

export const BusBooking = mongoose.model('BusBooking', busBookingSchema);

