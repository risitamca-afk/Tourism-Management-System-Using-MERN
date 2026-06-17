import { PackageBooking } from "../models/packagebooking.model.js"; // Adjust path as needed

// Create a new package booking
export const createPackageBooking = async (req, res) => {
  try {
    const {
      user,
      packageId,
      type,
      flightInfo,
      passengers,
      totalPassengers,
      totalAmount,
      paymentId,
    } = req.body;

    // Validate passenger count
    if (!Array.isArray(passengers) || passengers.length !== totalPassengers) {
      return res.status(400).json({
        message: "Passenger count does not match the provided number.",
      });
    }

    // Create booking
    const newBooking = new PackageBooking({
      user,
      packageId,
      type,
      flightInfo: type === "withFlight" ? flightInfo : undefined,
      passengers,
      totalPassengers,
      totalAmount,
      paymentId,
    });

    await newBooking.save();

    // try {
    //   const { paymentId } = req.body;

    //   const existingBooking = await PackageBooking.findOne({ paymentId });
    //   if (existingBooking) {
    //     return res.status(200).json({
    //       success: true,
    //       message: "Booking already exists",
    //       booking: existingBooking,
    //     });
    //   }

    // const PackageBooking = new PackageBooking(req.body);
    // await PackageBooking.save();

    //   res.status(201).json({ success: true, booking: PackageBooking });
    // } catch (error) {
    //   console.error("Booking save error:", error);
    //   res
    //     .status(500)
    //     .json({ success: false, message: "Failed to save Package booking" });
    // }

    res.status(201).json({
      message: "Package booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await PackageBooking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error });
  }
};

// Get a booking by ID
export const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await PackageBooking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch booking", error });
  }
};

// Delete a package booking by ID
export const deletePackageBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBooking = await PackageBooking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Package booking deleted successfully",
      deletedBooking,
    });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Failed to delete booking", error });
  }
};
