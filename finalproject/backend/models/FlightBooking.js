import mongoose from "mongoose";

const flightBookingSchema = new mongoose.Schema({
  username: String,
  flightId: { type: mongoose.Schema.Types.ObjectId, required: true },
  airline: String,
  flightNumber: String,
  from: String,
  to: String,
  departureTime: String,
  arrivalTime: String,
  date: Date,
  paymentId: { type: String, required: true, unique: true },
  bookedSeats: [String],
});

export const FlightBooking = mongoose.model(
  "FlightBooking",
  flightBookingSchema
);
