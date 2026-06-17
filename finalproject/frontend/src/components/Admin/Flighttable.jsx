import { useEffect, useState } from "react";
import axios from "axios";

const FlightTable = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editFlightId, setEditFlightId] = useState(null);
  const [editedFlight, setEditedFlight] = useState({
    airline: "",
    flightNumber: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    duration: "",
    price: "",
    date: "",
    class: "",
    seats: "",
  });

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/flightfetch");
      setFlights(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching flights:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this flight?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/deleteflights/${id}`);
      setFlights((prev) => prev.filter((flight) => flight._id !== id));
    } catch (err) {
      console.error("Error deleting flight:", err);
    }
  };

  const handleEditClick = (flight) => {
    setEditFlightId(flight._id);
    setEditedFlight({ ...flight });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/updateflights/${id}`,
        editedFlight
      );
      setEditFlightId(null);
      fetchFlights();
    } catch (err) {
      console.error("Error updating flight:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFlight((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Flight List</h2>
      {loading ? (
        <p className="text-center">Loading flights...</p>
      ) : flights.length === 0 ? (
        <p className="text-center">No flights found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2 border">Airline</th>
                <th className="px-4 py-2 border">Flight #</th>
                <th className="px-4 py-2 border">From</th>
                <th className="px-4 py-2 border">To</th>
                <th className="px-4 py-2 border">Departure</th>
                <th className="px-4 py-2 border">Arrival</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Class</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => (
                <tr key={flight._id} className="hover:bg-gray-100">
                  {editFlightId === flight._id ? (
                    <>
                      {[
                        "airline",
                        "flightNumber",
                        "from",
                        "to",
                        "departureTime",
                        "arrivalTime",
                        "price",
                        "class",
                      ].map((field) => (
                        <td key={field} className="px-4 py-2 border">
                          <input
                            name={field}
                            value={editedFlight[field]}
                            onChange={handleChange}
                            className="border p-1 w-full"
                          />
                        </td>
                      ))}
                      <td className="px-4 py-2 border space-x-2">
                        <button
                          onClick={() => handleSave(flight._id)}
                          className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditFlightId(null)}
                          className="bg-gray-400 text-white px-2 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-2 border">{flight.airline}</td>
                      <td className="px-4 py-2 border">
                        {flight.flightNumber}
                      </td>
                      <td className="px-4 py-2 border">{flight.from}</td>
                      <td className="px-4 py-2 border">{flight.to}</td>
                      <td className="px-4 py-2 border">
                        {flight.departureTime}
                      </td>
                      <td className="px-4 py-2 border">{flight.arrivalTime}</td>
                      <td className="px-4 py-2 border">{flight.price}</td>
                      <td className="px-4 py-2 border">{flight.class}</td>
                      <td className="px-4 py-2 border space-x-2">
                        <button
                          onClick={() => handleEditClick(flight)}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(flight._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FlightTable;
