import mongoose from "mongoose";

// ! flight schema
const flightSchema = new mongoose.Schema({
  goingFlightid: String,
  goingFlightname: String,
  goingFlightimage: String,
  goingFlighttime: String,
  goingFlightfrom: String,
  goingFlightto: String,
  goingFlightcabin: String,
  goingFlightcheckin: String,
  goingtime: String, // like total time 2:30 hour
  comingFlightid: String,
  comingFlightname: String,
  comingFlightimage: String,
  comingFlighttime: String,
  comingFlightfrom: String,
  comingFlightto: String,
  comingFlightcabin: String,
  comingFlightcheckin: String,
  comingtime: String, // like total time 2 hour
});

// ! flight schema for with flight
const withFlightDetailsSchema = new mongoose.Schema({
  price: Number,
  tax: Number,
  offer: String,
  crossoutPrice: Number,
  flight: [flightSchema],
});

// ! flight schema for without flight
const withoutFlightDetailsSchema = new mongoose.Schema({
  price: Number,
  tax: Number,
  offer: String,
  crossoutPrice: Number,
});

// ! flight  choosing option schema
const flightOptionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["withFlight", "withoutFlight"],
    required: true,
  },
  withFlightDetails: [withFlightDetailsSchema],
  withoutFlightDetails: withoutFlightDetailsSchema,
});

// ! Cab details schema
const cabDetailsSchema = new mongoose.Schema({
  img: { type: String },
  cabNo: { type: String },
  driverNo: { type: String }, // Example: "9087654321"
});

// ! Package schema
const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },

    images: [
      {
        src: { type: String },
        alt: { type: String },
      },
    ],

    specialFeatures: [{ type: String }],

    destination: { type: String, required: true },
    rating: { type: Number },
    ratingoutof5: { type: Number },
    ratingNumber: { type: Number },
    quality: { type: String },

    flightoption: [flightOptionSchema],
    hotelTypes: [
      {
        img: { type: String },
        type: { type: String },
        price: { type: Number },
        tax: { type: Number },
        specialFeatures: [{ type: String }],
      },
    ],

    activityOptions: [
      {
        activitytype: { type: String },
        img: { type: String },
        location: { type: String },
        duration: { type: String },
        moredetails: [{ type: String }],
      },
    ],

    // Added cabDetails field
    cabDetails: [cabDetailsSchema],
  },
  { timestamps: true }
);

export const Package = mongoose.model("Package", packageSchema);
