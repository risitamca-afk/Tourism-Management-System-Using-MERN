import { Flight } from "../models/Flight.js";

// GET: Fetch flights based on filters
export const getFlights = async (req, res) => {
  try {
    const {
      from,
      to,
      departureDate,
      returnDate,
      travellers,
      class: travelClass,
      fareType,
    } = req.query;

    const query = {
      from: { $regex: new RegExp(from, "i") },
      to: { $regex: new RegExp(to, "i") },
      date: new Date(departureDate),
      seats: { $gte: parseInt(travellers) || 1 },
    };

    if (travelClass && travelClass !== "Any") {
      query.class = { $regex: new RegExp(travelClass, "i") };
    }

    let flights = await Flight.find(query);

    // Apply discount
    flights = flights.map((flight) => {
      const flightData = flight.toObject();

      switch (fareType) {
        case "student":
          flightData.price *= 0.9;
          break;
        case "senior":
        case "armed":
        case "doctor":
          flightData.price =
            flightData.price > 3000
              ? flightData.price - 600
              : flightData.price * 0.85;
          break;
        default:
          break;
      }

      flightData.price = Math.round(flightData.price);
      return flightData;
    });

    // Handle return flights
    let returnFlights = [];
    if (returnDate) {
      const returnQuery = {
        from: { $regex: new RegExp(to, "i") },
        to: { $regex: new RegExp(from, "i") },
        date: new Date(returnDate),
        seats: { $gte: parseInt(travellers) || 1 },
      };

      if (travelClass && travelClass !== "Any") {
        returnQuery.class = { $regex: new RegExp(travelClass, "i") };
      }

      returnFlights = await Flight.find(returnQuery);

      returnFlights = returnFlights.map((flight) => {
        const flightData = flight.toObject();

        switch (fareType) {
          case "student":
            flightData.price *= 0.9;
            break;
          case "senior":
          case "armed":
          case "doctor":
            flightData.price =
              flightData.price > 3000
                ? flightData.price - 600
                : flightData.price * 0.85;
            break;
          default:
            break;
        }

        flightData.price = Math.round(flightData.price);
        return flightData;
      });
    }

    const response = returnDate
      ? { departureFlights: flights, returnFlights }
      : flights;

    res.json(response);
  } catch (err) {
    console.error("Error fetching flights:", err);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
};

// POST: Save a new flight
export const saveFlight = async (req, res) => {
  try {
    const newFlight = new Flight(req.body);
    const savedFlight = await newFlight.save();
    res
      .status(201)
      .json({ message: "Flight data saved successfully", flight: savedFlight });
  } catch (error) {
    console.error("Error saving flight:", error);
    res
      .status(400)
      .json({ error: "Error saving flight data", message: error.message });
  }
};

// Utility: Add sample flights to DB
export const addSampleFlights = async (req, res) => {
  try {
    const count = await Flight.countDocuments();
    if (count === 0) {
      const sampleFlights = [
        /* copy your sampleFlights array here */
      ];

      await Flight.insertMany(sampleFlights);
      console.log("Sample flights added to the database");
      res.status(200).json({ message: "Sample flights added" });
    } else {
      res.status(200).json({ message: "Flights already exist" });
    }
  } catch (err) {
    console.error("Error adding sample flights:", err);
    res.status(500).json({ error: "Failed to add sample flights" });
  }
};

// PUT /api/flights/:id
export const updateFlight = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedFlight = await Flight.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedFlight) {
      return res.status(404).json({ message: "Flight not found." });
    }

    res.status(200).json(updatedFlight);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating flight." });
  }
};

// DELETE /api/flights/:id
export const deleteFlight = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFlight = await Flight.findByIdAndDelete(id);

    if (!deletedFlight) {
      return res.status(404).json({ message: "Flight not found." });
    }

    res.status(200).json({ message: "Flight deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting flight." });
  }
};

export const fetchFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
