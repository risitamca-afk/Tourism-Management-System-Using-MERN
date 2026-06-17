import mongoose from "mongoose";

// Passenger Info
const passengerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  dob: { type: Date },
  gender: { type: String },
});

// Flight Info (only for 'withFlight')
const flightInfoSchema = new mongoose.Schema({
  flightNo: { type: String, required: true },
  flightName: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
});

// Booking Schema
const packageBookingSchema = new mongoose.Schema(
  {
    user: { type: String, required: true }, // Booked by
    packageId: { type: mongoose.Schema.Types.ObjectId, required: true },

    type: {
      type: String,
      enum: ["withFlight", "withoutFlight"],
      required: true,
    },

    flightInfo: {
      type: flightInfoSchema,
      required: function () {
        return this.type === "withFlight";
      },
    },

    passengers: {
      type: [passengerSchema],
      required: true,
    },

    totalPassengers: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentId: {
      type: String,
      required: true,
      // unique: true,
    },
  },
  { timestamps: true }
);

export const PackageBooking = mongoose.model(
  "PackageBooking",
  packageBookingSchema
);
