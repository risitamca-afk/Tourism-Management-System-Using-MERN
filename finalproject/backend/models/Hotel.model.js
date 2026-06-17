import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    img: { type: String, required: true },
    images: [
      {
        src: { type: String, required: true },
      },
    ], // Could be a URL or static import identifier    imgSrc: { type: String, required: true }
    destination: { type: String, required: true },
    // checkInDate: { type: Date, required: true },
    // checkOutDate: { type: Date, required: true },
    rating: { type: Number, required: true }, // e.g. 4.7
    ratingoutof5: { type: Number }, // e.g. 3.5 — clarify meaning or remove if duplicate
    ratingNumber: { type: Number }, // Total reviews
    quality: { type: String }, // e.g. "very good"

    amenities: [
      {
        img: { type: String, required: true }, // Icon name or path
        name: { type: String, required: true },
      },
    ],

    roomTypes: [
      {
        type: { type: String, required: true }, // e.g. Normal, Standard
        price: { type: Number, required: true },
        tax: { type: Number, required: true },
        availableRooms: { type: Number, required: true },
        specialFeatures: [{ type: String }], // e.g. breakfast included, free wifi
      },
    ],

    mealsOptions: [
      {
        id: { type: String },
        label: { type: String },
        price: { type: Number },
        description: { type: String },
      },
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

export const Hotel = mongoose.model("Hotel", HotelSchema);
