import {TrainBooking} from "../models/TrainBooking.js";

// Create new train booking
export const createTrainBooking = async (req, res) => {
  try {
    const newBooking = new TrainBooking(req.body);
    await newBooking.save();
    res.status(201).json({ message: "Train booking saved successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to save booking", details: error.message });
  }
};

// Get all train bookings
export const getAllTrainBookings = async (req, res) => {
  try {
    const bookings = await TrainBooking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch train bookings" });
  }
};

// Cancel a booking by trainId
export const cancelTrainBooking = async (req, res) => {
  try {
    const { trainId } = req.params;

    const result = await TrainBooking.deleteOne({ trainId });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Train booking not found or already deleted" });
    }

    res.status(200).json({ message: "Train booking cancelled successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Error canceling train booking" });
  }
};
