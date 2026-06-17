import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FlightResults.css";

const FlightResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state;

  // Mock flight data
  const flightResults = [
    {
      airline: "Air India",
      duration: "20h 30m",
      departure: "22:30 (DEL)",
      arrival: "15:00 (BLR)",
      price: "₹22,808",
    },
    {
      airline: "Indigo",
      duration: "20h 30m",
      departure: "21:30 (DEL)",
      arrival: "14:00 (BLR)",
      price: "₹22,808",
    },
    {
      airline: "Spicejet",
      duration: "20h 00m",
      departure: "11:30 (DEL)",
      arrival: "7:00 (BLR)",
      price: "₹22,480",
    },
    {
      airline: "Indigo",
      duration: "20h 30m",
      departure: "13:30 (DEL)",
      arrival: "9:00 (BLR)",
      price: "₹23,480",
    },
    {
      airline: "Indigo",
      duration: "20h 30m",
      departure: "13:30 (DEL)",
      arrival: "9:00 (BLR)",
      price: "₹23,480",
    },
    {
      airline: "Indigo",
      duration: "20h 30m",
      departure: "13:30 (DEL)",
      arrival: "9:00 (BLR)",
      price: "₹23,480",
    },
    {
      airline: "Air India",
      duration: "20h 30m",
      departure: "22:30 (DEL)",
      arrival: "15:00 (BLR)",
      price: "₹22,808",
    },
    {
      airline: "Air India",
      duration: "20h 30m",
      departure: "22:30 (DEL)",
      arrival: "15:00 (BLR)",
      price: "₹22,808",
    },
  ];

  const handleBook = (flight) => {
    navigate("/passenger-details", {
      state: {
        formData,
        flight,
      },
    });
  };

  // Search bar logic
  const [tripType, setTripType] = useState(formData.tripType || "roundTrip");
  const [from, setFrom] = useState(formData.from || "");
  const [to, setTo] = useState(formData.to || "");
  const [departureDate, setDepartureDate] = useState(formData.departureDate || "");
  const [returnDate, setReturnDate] = useState(formData.returnDate || "");

  const handleSearchUpdate = () => {
    alert("Search updated! Check console for new search parameters.");
    console.log({ tripType, from, to, departureDate, returnDate });
    // Logic to refresh or fetch updated flight results can be added here
  };

  return (
    <div className="flightresultmaindiv">
<div className="flight-results">
      {/* Search bar component */}
      <div className="search-bar">
        <form className="search-form" >

          <input
          className="flightinput"
            type="text"
            placeholder="From (e.g., DEL)"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />

          <input
          className="flightinput"
            type="text"
            placeholder="To (e.g., BLR)"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />

          <input
          className="flightinput"
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />


          <button
          className="searchbtnforflight"
            type="button"
            onClick={handleSearchUpdate}
          >
            Update Search
          </button>
        </form>
      </div>

      {/* Flight results */}
      <h2>Flight Results</h2>
      <p>
        Showing results for {tripType} from {from} to {to}
      </p>
      <div className="results-container">
        {flightResults.map((flight, index) => (
          <div key={index} className="flight-card">
            <p>
              <strong>Airline:</strong> {flight.airline}
            </p>
            <p>
              <strong>Duration:</strong> {flight.duration}
            </p>
            <p>
              <strong>Departure:</strong> {flight.departure}{" "}
              <strong>Arrival:</strong> {flight.arrival}
            </p>
            <p>
              <strong>Price:</strong> {flight.price}
            </p>
            <button onClick={() => handleBook(flight)}>Book Now</button>
          </div>
        ))}
      </div>
    </div>
    </div>
    
  );
};

export default FlightResults;
