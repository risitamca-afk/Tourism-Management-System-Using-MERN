import mongoose from "mongoose";

const busSeatSchema = new mongoose.Schema({
  busId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Bus",
  },
  bookedSeats: {
    type: [Number],
    default: [],
  },
});

export const BusSeat = mongoose.model("BusSeat", busSeatSchema);
