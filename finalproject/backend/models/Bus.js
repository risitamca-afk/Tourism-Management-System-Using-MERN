import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  busName: String,
  busNumber: String,
  from: String,
  to: String,
  departureTime: String,
  arrivalTime: String,
  duration: String,
  price: Number,
  date: Date,
  class: String,
  seats: Number,
  rating: String,
});
export const Bus = mongoose.model("Bus", busSchema);
