import {CabBooking} from '../models/CabBooking.js';

// Create a new cab booking
export const createCabBooking = async (req, res) => {
  try {
    const newBooking = new CabBooking(req.body);
    await newBooking.save();
    res.status(201).json({ message: 'Cab booking saved successfully' });
  } catch (error) {
    console.error('Error saving cab booking:', error);
    res.status(500).json({ error: 'Failed to save cab booking' });
  }
};

// Get all cab bookings
export const getAllCabBookings = async (req, res) => {
  try {
    const bookings = await CabBooking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

// Cancel a cab booking
export const cancelCabBooking = async (req, res) => {
  try {
    const { CabId } = req.params;
    const result = await CabBooking.deleteOne({ CabId: CabId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Cab booking not found or already deleted' });
    }

    res.status(200).json({ message: 'Cab booking cancelled successfully' });
  } catch (error) {
    console.error('Error canceling cab booking:', error);
    res.status(500).json({ message: 'Error canceling cab booking' });
  }
};
