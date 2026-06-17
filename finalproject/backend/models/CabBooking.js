import mongoose from "mongoose";

const cabBookingSchema = new mongoose.Schema({
  CabId: { type: mongoose.Schema.Types.ObjectId, required: true },
  cabName: String,
  cabNumber: String,
  carType: {
    type: String,
    required: true,
    enum: ['Sedan', 'SUV', 'Hatchback'],
  },
  from: String,
  to: String,
  date: Date,
  paymentId: { type: String, required: true, unique: true },
});

export const CabBooking = mongoose.model('CabBooking', cabBookingSchema);
