import {BusSeat} from '../models/BusSeat.js';

// GET: Fetch booked seats for a bus
export const getBookedSeats = async (req, res) => {
  try {
    const { busId } = req.params;
    const seatData = await BusSeat.findOne({ busId });

    res.json(seatData ? seatData.bookedSeats : []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch booked seats' });
  }
};

// POST: Book selected seats for a bus
export const bookSeats = async (req, res) => {
  const { busId, selectedSeats } = req.body;

  try {
    let seatDoc = await BusSeat.findOne({ busId });

    if (!seatDoc) {
      // First time booking
      seatDoc = new BusSeat({ busId, bookedSeats: selectedSeats });
    } else {
      // Check for conflicts
      const alreadyBooked = selectedSeats.filter(seat => seatDoc.bookedSeats.includes(seat));
      if (alreadyBooked.length > 0) {
        return res.status(400).json({
          message: `Some seats are already booked: ${alreadyBooked.join(', ')}`,
        });
      }

      // No conflict – proceed
      seatDoc.bookedSeats.push(...selectedSeats);
    }

    await seatDoc.save();
    res.json({ message: 'Seats booked successfully', bookedSeats: seatDoc.bookedSeats });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Booking failed' });
  }
};

// module.exports = {
//   getBookedSeats,
//   bookSeats
// };
