import {Bus} from '../models/Bus.js';

// Controller to handle POST request for adding bus data
export const addBus = async (req, res) => {
  try {
    const newBus = new Bus(req.body);
    await newBus.save();
    res.status(201).json({ message: 'Bus saved successfully', bus: newBus });
  } catch (error) {
    console.error('Error saving bus:', error);
    res.status(500).json({ message: 'Error saving bus', error });
  }
};

// Controller to fetch buses based on query parameters
export const getBuses = async (req, res) => {
  try {
    const { from, to, departureDate, travellers } = req.query;

    // Create search query
    const query = {
      from: { $regex: new RegExp(from, 'i') },
      to: { $regex: new RegExp(to, 'i') },
      date: new Date(departureDate),
      seats: { $gte: parseInt(travellers) || 1 },
    };

    console.log('Searching buses with query:', query);

    // Find matching buses
    const buses = await Bus.find(query);
    res.json(buses);
  } catch (err) {
    console.error('Error fetching buses:', err);
    res.status(500).json({ error: 'Failed to fetch buses' });
  }
};
