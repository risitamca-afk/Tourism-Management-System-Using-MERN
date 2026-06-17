import {FlightBooking} from '../models/FlightBooking.js';

// POST: Create a new booking
export const createFlightBooking = async (req, res) => {
  try {
    const { paymentId } = req.body;

    const existingBooking = await FlightBooking.findOne({ paymentId });
    if (existingBooking) {
      return res.status(200).json({ success: true, message: 'Booking already exists', booking: existingBooking });
    }

    const flightBooking = new FlightBooking(req.body);
    await flightBooking.save();

    res.status(201).json({ success: true, booking: flightBooking });
  } catch (error) {
    console.error("Booking save error:", error);
    res.status(500).json({ success: false, message: 'Failed to save flight booking' });
  }
};

// GET: Fetch all bookings
export const getAllFlightBookings = async (req, res) => {
  try {
    const bookings = await FlightBooking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch flight bookings' });
  }
};

// DELETE: Cancel a booking
export const deleteFlightBooking = async (req, res) => {
  try {
    const { flightId } = req.params;

    const result = await FlightBooking.deleteOne({ flightId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Flight booking not found or already deleted' });
    }

    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Error canceling booking' });
  }
};

// module.exports = {
//   createFlightBooking,
//   getAllFlightBookings,
//   deleteFlightBooking
// };
