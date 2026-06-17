import { Train } from "../models/Train.js";

// Add new train
export const addTrain = async (req, res) => {
  try {
    const newTrain = new Train(req.body);
    await newTrain.save();
    res
      .status(201)
      .json({ message: "Train saved successfully", train: newTrain });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to save train", details: err.message });
  }
};

// Fetch trains based on search query
export const getTrains = async (req, res) => {
  try {
    const { from, to, departureDate, travellers } = req.query;

    const query = {
      from: { $regex: new RegExp(from, "i") },
      to: { $regex: new RegExp(to, "i") },
      date: new Date(departureDate),
      seats: { $gte: parseInt(travellers) || 1 },
    };

    const trains = await Train.find(query);
    res.status(200).json(trains);
  } catch (err) {
    console.error("Error fetching trains:", err);
    res.status(500).json({ error: "Failed to fetch trains" });
  }
};

// Add sample train data (useful during DB seeding)
export const addSampleTrains = async (req, res) => {
  try {
    const count = await Train.countDocuments();
    if (count > 0) {
      return res.status(200).json({ message: "Trains already exist" });
    }

    const sampleTrains = [
      /* ... (paste your sample trains here) ... */
    ];

    await Train.insertMany(sampleTrains);
    res.status(201).json({ message: "Sample trains added" });
  } catch (err) {
    console.error("Error adding sample trains:", err);
    res.status(500).json({ error: "Failed to add trains" });
  }
};
