import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FlightBooking.css";

const FlightBookingForm = () => {
  const [formData, setFormData] = useState({
    tripType: "One Way",
    from: "",
    to: "",
    departure: "",
    return: "",
    travelers: 1,
    travelClass: "Economy",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.from) formErrors.from = "From location is required.";
    if (!formData.to) formErrors.to = "To location is required.";
    if (!formData.departure) formErrors.departure = "Departure date is required.";
    if (formData.tripType === "Round Trip" && !formData.return)
      formErrors.return = "Return date is required for round trips.";

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Navigate to results page and pass data
      navigate("/results", { state: { formData } });
    }
  };

  return (
    <div className="booking-container">
      <header className="header">
        <nav>
          <span className="nav-item " >✈ Flights</span>
          <span className="nav-item ">🚆 Trains</span>
          <span className="nav-item ">🚌 Buses</span>
          <span className="nav-item ">🚗 Cabs</span>
        </nav>
        <h2>Book International and Domestic Flights ✈ </h2>
       
      </header>
    <form onSubmit={handleSubmit} className="booking-form">
      <div className="trip-options">
        <label>
          <input
          className="flightinput flightinputradio"
            type="radio"
            name="tripType"
            value="One Way"
            checked={formData.tripType === "One Way"}
            onChange={handleChange}
          />
          One Way Trip
        </label>
        <label>
          <input
          className="flightinput flightinputradio"
            type="radio"
            name="tripType"
            value="Round Trip"
            checked={formData.tripType === "Round Trip"}
            onChange={handleChange}
          />
          Round Trip
        </label>
      </div>
      <div class="form-group">
        <label>From:</label>
        <input
        className="flightinput"
          type="text"
          name="from"
          value={formData.from}
          onChange={handleChange}
        />
        {errors.from && <span className="topspan"style={{ color: "red" }}>{errors.from}</span>}
      </div>
      <div class="form-group">
        <label>To:</label>
        <input
        className="flightinput"
          type="text"
          name="to"
          value={formData.to}
          onChange={handleChange}
        />
        {errors.to && <span className="topspan" style={{ color: "red" }}>{errors.to}</span>}
      </div>
      <div class="form-group">
        <label>Departure:</label>
        <input
        className="flightinput"
          type="date"
          name="departure"
          value={formData.departure}
          onChange={handleChange}
        />
        {errors.departure && (
          <span className="topspan" style={{ color: "red" }}>{errors.departure}</span>
        )}
      </div>
      {formData.tripType === "Round Trip" && (
        <div class="form-group">
          <label>Return:</label>
          <input
          className="flightinput"
            type="date"
            name="return"
            value={formData.return}
            onChange={handleChange}
          />
          {errors.return && <span className="topspan" style={{ color: "red" }}>{errors.return}</span>}
        </div>
      )}
       <div class="form-group">
          <label>Travelers:</label>
          <input
          className="flightinput"
            type="number"
            name="travelers"
            value={formData.travelers}
            min="1"
            max="10"
            onChange={handleChange}
          />
        </div>
      <div class="form-group"> 
        <label>Class:</label>
        <select
        className="flightinput"
          name="travelClass"
          value={formData.travelClass}
          onChange={handleChange}
        >
          <option value="Economy">Economy</option>
          <option value="Premium Economy">Premium Economy</option>
          <option value="Business">Business</option>
          <option value="First Class">First Class</option>
        </select>
      </div>
      <button type="submit" className="flightbookbtn">Search Flights</button>
    </form>
  </div>
  );
};

export default FlightBookingForm;
