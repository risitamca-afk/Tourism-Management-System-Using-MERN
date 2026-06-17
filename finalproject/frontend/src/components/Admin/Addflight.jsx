import React, { useState } from "react";
import axios from "axios";

function Addflight() {
  const [flightData, setFlightData] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData({
      ...flightData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/flights", {
        ...flightData,
        price: Number(flightData.price),
        seats: Number(flightData.seats),
        date: new Date(flightData.date),
      });

      console.log("✅ Flight data saved:", response.data);
      alert("Flight successfully saved!");
      setFlightData({
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
    } catch (error) {
      console.error("❌ Error saving flight data:", error);
      alert("Error saving flight data. Please check console.");
    }
  };

  const fieldMap = {
    Airline: "airline",
    "Flight Number": "flightNumber",
    From: "from",
    To: "to",
    "Departure Time": "departureTime",
    "Arrival Time": "arrivalTime",
    Duration: "duration",
    Price: "price",
    Date: "date",
    Class: "class",
    Seats: "seats",
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Add New Flight
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.entries(fieldMap).map(([label, name], i) => {
            const type =
              name === "price" || name === "seats"
                ? "number"
                : name === "date"
                ? "date"
                : "text";

            return (
              <div key={i}>
                <label
                  htmlFor={name}
                  className="block text-lg font-semibold text-gray-800 mb-2"
                >
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={flightData[name]}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 p-3 rounded-xl bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            );
          })}

          <button
            type="submit"
            className="w-full  bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition duration-300 ease-in-out transform hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addflight;
