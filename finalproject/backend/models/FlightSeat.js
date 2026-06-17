import mongoose from "mongoose";

const flightSeatSchema = new mongoose.Schema({
  flightId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Flight' },
  bookedSeats: [String], // Example: ["A1", "B2"]
});

export const FlightSeat = mongoose.model('FlightSeat', flightSeatSchema);
