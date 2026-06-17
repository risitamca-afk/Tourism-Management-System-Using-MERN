import { HotelBooking } from "../models/hotel.booking.model.js";

export const createHotelBooking = async (req, res) => {
  try {
    const {
      username,
      hotelId,
      hotelName,
      Place,
      roomType,
      roomCount,
      paymentId,
      checkInDate,
      checkOutDate,
    } = req.body;

    const newBooking = new HotelBooking({
      username,
      hotelId,
      hotelName,
      Place,
      roomType,
      roomCount,
      paymentId,
      checkInDate,
      checkOutDate,
    });

    await newBooking.save();
    res.status(201).json({ message: "Hotel booking saved successfully." });
  } catch (error) {
    console.error("Error saving hotel booking:", error);
    res
      .status(500)
      .json({ error: "Failed to save booking", details: error.message });
  }
};

export const getAllHotelBookings = async (req, res) => {
  try {
    const bookings = await HotelBooking.find(); // or filter by username if passed
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching all bookings:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

export const deleteHotelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const deletedBooking = await HotelBooking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking: deletedBooking,
    });
  } catch (err) {
    console.error("Error cancelling booking:", err);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
};
