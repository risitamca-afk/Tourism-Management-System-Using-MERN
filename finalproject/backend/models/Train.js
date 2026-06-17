import mongoose from "mongoose";

const trainSchema = new mongoose.Schema({
  trainName: String,
  trainNumber: String,
  from: String,
  to: String,
  departureTime: String,
  arrivalTime: String,
  duration: String,
  price: Number,
  date: Date,
  class: String,
  seats: Number,
});

export const Train = mongoose.model("Train", trainSchema);
