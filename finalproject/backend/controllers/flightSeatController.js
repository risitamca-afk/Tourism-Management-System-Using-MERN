import {FlightSeat} from "../models/FlightSeat.js";

// GET booked seats for a flight
export const getBookedSeats = async (req, res) => {
  try {
    const seatDoc = await FlightSeat.findOne({ flightId: req.params.flightId });
    res.json(seatDoc?.bookedSeats || []);
  } catch (err) {
    console.error("Error fetching seats:", err);
    res.status(500).json({ message: "Error fetching seats" });
  }
};

// POST book seats for a flight
export const bookSeats = async (req, res) => {
  const { flightId, selectedSeats } = req.body;

  try {
    let seatDoc = await FlightSeat.findOne({ flightId });

    if (!seatDoc) {
      seatDoc = new FlightSeat({ flightId, bookedSeats: [] });
    }

    const alreadyBooked = selectedSeats.some((seat) =>
      seatDoc.bookedSeats.includes(seat)
    );

    if (alreadyBooked) {
      return res.status(400).json({ message: "Some seats already booked" });
    }

    seatDoc.bookedSeats.push(...selectedSeats);
    await seatDoc.save();

    res.status(200).json({ message: "Seats booked successfully" });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Booking failed" });
  }
};

// module.exports = {
//   getBookedSeats,
//   bookSeats,
// };
