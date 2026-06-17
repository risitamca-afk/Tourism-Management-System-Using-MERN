import {Cab} from '../models/Cab.js';

// Add a new cab
export const addCab = async (req, res) => {
  try {
    const cab = new Cab(req.body);
    await cab.save();
    res.status(201).json({ message: 'Cab added successfully', cab });
  } catch (err) {
    res.status(400).json({ error: 'Error saving cab', details: err.message });
  }
};

// Get cabs based on search query
export const getCabs = async (req, res) => {
  try {
    const { tripType, from, to, date, pickupTime, duration } = req.query;
    const query = {};

    if (tripType) query.tripType = tripType;
    if (from) query.from = { $regex: new RegExp(from, 'i') };
    if (to && tripType !== 'hourlyRental') query.to = { $regex: new RegExp(to, 'i') };
    if (date) query.date = new Date(date);
    if (pickupTime && (tripType === 'airportPickup' || tripType === 'hourlyRental')) {
      query.pickupTime = pickupTime;
    }
    if (tripType === 'hourlyRental' && duration) {
      query.duration = duration;
    }

    console.log('Generated query:', query);
    const cabs = await Cab.find(query);
    res.status(200).json(cabs);
  } catch (err) {
    console.error('Error fetching cabs:', err);
    res.status(500).json({ error: 'Failed to fetch cabs' });
  }
};
