import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FlightSearchApp.css";

function FlightSearchApp() {
  const navigate = useNavigate();

  const [tripType, setTripType] = useState("oneWay");
  const [from, setFrom] = useState("Kolkata");
  const [to, setTo] = useState("Delhi");
  const [departureDate, setDepartureDate] = useState("2025-04-02");
  const [returnDate, setReturnDate] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");
  const [fareType, setFareType] = useState("regular");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  const handleSearch = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!from) validationErrors.from = "Origin is required";
    if (!to) validationErrors.to = "Destination is required";
    if (from === to)
      validationErrors.same = "Origin and destination cannot be the same";
    if (!departureDate)
      validationErrors.departureDate = "Departure date is required";
    if (tripType === "roundTrip" && !returnDate)
      validationErrors.returnDate = "Return date is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setError(null);
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:5000/api/flights", {
        params: {
          from,
          to,
          departureDate,
          returnDate: tripType === "roundTrip" ? returnDate : null,
          travellers,
          class: travelClass,
          fareType,
        },
      });

      navigate("/results", {
        state: {
          flights: response.data,
          passengers: travellers,
        },
      });
    } catch (err) {
      console.error("Error fetching flights:", err);
      setError("Failed to fetch flights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flight-search-container max-w-6xl mx-auto p-6 font-sans">
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-lg shadow-md p-6 mb-8 space-y-6"
      >
        {/* Trip Type Selection */}
        <div className="flex items-center mb-5 relative">
          <label
            className={`flex items-center mr-5 cursor-pointer px-3 py-2 rounded ${
              tripType === "oneWay"
                ? "text-blue-600 font-semibold"
                : "text-gray-600"
            }`}
          >
            <input
              className="mr-2"
              type="radio"
              name="tripType"
              value="oneWay"
              checked={tripType === "oneWay"}
              onChange={() => setTripType("oneWay")}
            />
            One Way
          </label>
          <label
            className={`flex items-center mr-5 cursor-pointer px-3 py-2 rounded ${
              tripType === "roundTrip"
                ? "text-blue-600 font-semibold"
                : "text-gray-600"
            }`}
          >
            <input
              className="mr-2"
              type="radio"
              name="tripType"
              value="roundTrip"
              checked={tripType === "roundTrip"}
              onChange={() => setTripType("roundTrip")}
            />
            Round Trip
          </label>
          <div className="absolute right-0 text-gray-500 text-sm">
            Book International and Domestic Flights
          </div>
        </div>

        {/* Search Fields */}
        <div className="search-fields">
          <div className="field from-field">
            <label>From</label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Enter origin city"
              className={errors.from || errors.same ? "error" : ""}
            />
            {errors.from && <div className="error-message">{errors.from}</div>}
          </div>

          <button
            type="button"
            className="switch-button"
            onClick={() => {
              const temp = from;
              setFrom(to);
              setTo(temp);
            }}
          >
            ⇄
          </button>

          <div className="field to-field">
            <label>To</label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Enter destination city"
              className={errors.to || errors.same ? "error" : ""}
            />
            {errors.to && <div className="error-message">{errors.to}</div>}
            {errors.same && <div className="error-message">{errors.same}</div>}
          </div>

          <div className="field date-field">
            <label>Departure</label>
            <input
              type="date"
              value={departureDate}
              min={today}
              onChange={(e) => setDepartureDate(e.target.value)}
              className={errors.departureDate ? "error" : ""}
            />
            {departureDate && (
              <div className="date-info">
                {new Date(departureDate)
                  .toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "2-digit",
                    weekday: "long",
                  })
                  .replace(",", "")}
              </div>
            )}
            {errors.departureDate && (
              <div className="error-message">{errors.departureDate}</div>
            )}
          </div>

          <div
            className={`field date-field ${
              tripType === "roundTrip" ? "" : "disabled"
            }`}
          >
            <label>Return</label>
            <input
              type="date"
              value={returnDate}
              min={departureDate || today}
              onChange={(e) => setReturnDate(e.target.value)}
              disabled={tripType !== "roundTrip"}
              className={errors.returnDate ? "error" : ""}
            />
            {tripType === "roundTrip" &&
              (returnDate ? (
                <div className="date-info">
                  {new Date(returnDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "2-digit",
                  })}
                </div>
              ) : (
                <div className="date-info hint">
                  Tap to add a return date for bigger discounts
                </div>
              ))}
            {errors.returnDate && (
              <div className="error-message">{errors.returnDate}</div>
            )}
          </div>

          <div className="field travellers-field">
            <label>Travellers & Class</label>
            <div className="traveller-info">
              <div>
                <select
                  value={travellers}
                  onChange={(e) => setTravellers(Number(e.target.value))}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={travelClass}
                  onChange={(e) => setTravelClass(e.target.value)}
                >
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Business Economy">Business</option>
                  <option value="First Economy">First</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Special Fare Options */}
        <div className="special-fares">
          <div className="fare-label">
            Select a special fare
            <span className="extra-savings">EXTRA SAVINGS</span>
          </div>
          <div className="fare-options">
            {["regular", "student", "senior", "armed", "doctor"].map((type) => (
              <label key={type} className={fareType === type ? "active" : ""}>
                <input
                  type="radio"
                  name="fareType"
                  value={type}
                  checked={fareType === type}
                  onChange={() => setFareType(type)}
                />
                <div className="fare-title">
                  {type === "armed"
                    ? "Armed Forces"
                    : type === "doctor"
                    ? "Doctor and Nurses"
                    : type.charAt(0).toUpperCase() + type.slice(1)}
                </div>
                <div className="fare-desc">
                  {type === "regular" ? "Regular fares" : "Up to ₹ 600 off"}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Search Button */}
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? "Searching..." : "SEARCH"}
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default FlightSearchApp;
