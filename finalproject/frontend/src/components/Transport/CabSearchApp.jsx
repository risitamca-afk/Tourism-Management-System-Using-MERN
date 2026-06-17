import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CabSearchApp() {
  const navigate = useNavigate();

  const [tripType, setTripType] = useState("outstationOneWay");
  const [from, setFrom] = useState("Kolkata");
  const [to, setTo] = useState("Delhi");
  const [date, setDate] = useState("2025-04-29");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [duration, setDuration] = useState("1");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  const handleSearch = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!from) validationErrors.from = "Pickup location is required";
    if (tripType !== "hourlyRental" && !to)
      validationErrors.to = "Drop location is required";
    if (!date) validationErrors.date = "Date is required";
    if (
      (tripType === "airportPickup" || tripType === "hourlyRental") &&
      !pickupTime
    )
      validationErrors.pickupTime = "Pickup time is required";
    if (tripType === "hourlyRental" && !duration)
      validationErrors.duration = "Duration is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setError(null);
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:5000/api/cabs", {
        params: {
          tripType,
          from,
          to: tripType !== "hourlyRental" ? to : null,
          date,
          pickupTime:
            tripType === "airportPickup" || tripType === "hourlyRental"
              ? pickupTime
              : null,
          duration: tripType === "hourlyRental" ? duration : null,
        },
      });

      navigate("/cabresultspage", { state: { cabs: response.data } });
    } catch (err) {
      setError("Failed to fetch cabs. Please try again.");
      console.error("Error fetching cabs:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cab-search-container shadow-inner m-5 p-5 ">
      <form onSubmit={handleSearch} className="search-form">
        <div className="trip-types flex justify-between mx-5 ">
          <div className="flex gap-10">
            <label
              className={`cursor-pointer ${
                tripType === "outstationOneWay"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-800"
              }`}
            >
              <input
                type="radio"
                name="tripType"
                value="outstationOneWay"
                checked={tripType === "outstationOneWay"}
                onChange={() => setTripType("outstationOneWay")}
                className="mr-2"
              />
              Outstation One-Way
            </label>
            <label
              className={`cursor-pointer ${
                tripType === "airportPickup"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-800"
              }`}
            >
              <input
                type="radio"
                name="tripType"
                value="airportPickup"
                checked={tripType === "airportPickup"}
                onChange={() => setTripType("airportPickup")}
                className="mr-2"
              />
              Airport Pickup
            </label>

            <label
              className={`cursor-pointer ${
                tripType === "hourlyRental"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-800"
              }`}
            >
              <input
                type="radio"
                name="tripType"
                value="hourlyRental"
                checked={tripType === "hourlyRental"}
                onChange={() => setTripType("hourlyRental")}
                className="mr-2"
              />
              Hourly Rental
            </label>
          </div>

          <div className="book-info">
            Book Outstation, Airport or Rental Cabs
          </div>
        </div>

        <div className="search-fields searchtrain">
          <div className="field from-field">
            <label>From</label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Enter pickup location"
              className={errors.from ? "error" : ""}
            />
            {errors.from && <div className="error-message">{errors.from}</div>}
          </div>

          {tripType !== "hourlyRental" && (
            <div className="field to-field">
              <label>To</label>
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Enter drop location"
                className={errors.to ? "error" : ""}
              />
              {errors.to && <div className="error-message">{errors.to}</div>}
            </div>
          )}

          <div className="field date-field">
            <label>Date</label>
            <input
              type="date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
              className={errors.date ? "error" : ""}
            />
            {errors.date && <div className="error-message">{errors.date}</div>}
          </div>

          {(tripType === "airportPickup" || tripType === "hourlyRental") && (
            <div className="field time-field">
              <label>Pickup Time</label>
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className={errors.pickupTime ? "error" : ""}
              />
              {errors.pickupTime && (
                <div className="error-message">{errors.pickupTime}</div>
              )}
            </div>
          )}

          {tripType === "hourlyRental" && (
            <div className="field duration-field">
              <label>Duration (Hours)</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className={errors.duration ? "error" : ""}
              >
                <option value="1">1 Hour</option>
                <option value="2">2 Hours</option>
                <option value="3">3 Hours</option>
                <option value="4">4 Hours</option>
              </select>
              {errors.duration && (
                <div className="error-message">{errors.duration}</div>
              )}
            </div>
          )}
        </div>

        <button type="submit" className="search-button" disabled={loading}>
          {loading ? "Searching..." : "SEARCH"}
        </button>

        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default CabSearchApp;
