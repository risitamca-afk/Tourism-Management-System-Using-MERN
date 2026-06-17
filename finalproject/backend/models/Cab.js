import mongoose from "mongoose";

const cabSchema = new mongoose.Schema({
  tripType: {
    type: String,
    required: true,
    enum: ['airportPickup', 'hourlyRental', 'outstationOneWay'],
  },
  cabName: String,
  cabNumber: String,
  rating: String,
  imageurl: String,
  from: {
    type: String,
    required: true,
    trim: true,
  },
  to: {
    type: String,
    required: function () {
      return this.tripType !== 'hourlyRental';
    },
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  pickupTime: {
    type: String,
    required: function () {
      return this.tripType === 'airportPickup' || this.tripType === 'hourlyRental';
    },
  },
  duration: {
    type: String,
    required: function () {
      return this.tripType === 'hourlyRental';
    },
  },
  price: {
    type: Number,
    required: true,
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
  carType: {
    type: String,
    required: true,
    enum: ['Sedan', 'SUV', 'Hatchback'],
  },
  amenities: {
    type: [String],
    default: [],
  },
});

export const Cab = mongoose.model('Cab', cabSchema);
