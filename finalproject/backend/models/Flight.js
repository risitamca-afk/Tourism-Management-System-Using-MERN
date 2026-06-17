import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  airline: String,
  flightNumber: String,
  from: String,
  to: String,
  departureTime: String,
  arrivalTime: String,
  duration: String,
  price: Number,
  date: Date,
  class: String,
  seats: Number
});

export const Flight = mongoose.model('Flight', flightSchema);