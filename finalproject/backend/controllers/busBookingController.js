import { BusBooking } from "../models/BusBooking.js";
// POST: Add a new bus booking
export const createBusBooking = async (req, res) => {
  try {
    const booking = new BusBooking(req.body);
    await booking.save();
    res.status(201).json({ message: "Bus booking saved successfully" });
  } catch (error) {
    console.error("Error saving bus booking:", error);
    res.status(500).json({ error: "Failed to save bus booking" });
  }
};

// GET: Fetch all bus bookings
export const getAllBusBookings = async (req, res) => {
  try {
    const bookings = await BusBooking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bus bookings:", error);
    res.status(500).json({ error: "Failed to fetch bus bookings" });
  }
};

// DELETE: Cancel a bus booking by BusId
export const cancelBusBooking = async (req, res) => {
  try {
    const { BusId } = req.params;
    const result = await BusBooking.deleteOne({ BusId });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Bus booking not found or already deleted" });
    }

    res.status(200).json({ message: "Bus booking cancelled successfully" });
  } catch (err) {
    console.error("Error canceling bus booking:", err);
    res.status(500).json({ message: "Error canceling bus booking" });
  }
};

// module.exports = {
//   createBusBooking,
//   getAllBusBookings,
//   cancelBusBooking,
// };
