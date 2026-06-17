import mongoose from "mongoose";

const trainBookingSchema = new mongoose.Schema({
  trainId: { type: mongoose.Schema.Types.ObjectId, required: true },
  trainName: String,
  trainNumber: String,
  from: String,
  to: String,
  departureTime: String,
  arrivalTime: String,
  date: Date,
  paymentId: { type: String, required: true, unique: true }
});

export const TrainBooking= mongoose.model('TrainBooking', trainBookingSchema);
