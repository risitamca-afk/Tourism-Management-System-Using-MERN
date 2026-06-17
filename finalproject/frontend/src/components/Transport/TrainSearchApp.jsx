import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TrainSearchApp() {
  const navigate = useNavigate();

  const [from, setFrom] = useState("Howrah");
  const [to, setTo] = useState("Delhi");
  const [departureDate, setDepartureDate] = useState("2025-05-11");
  const [travellers, setTravellers] = useState(1);
  const [travelClass, setTravelClass] = useState("All Class");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  const handleSearch = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!from.trim()) validationErrors.from = "Departure station is required";
    if (!to.trim()) validationErrors.to = "Arrival station is required";
    if (from.trim().toLowerCase() === to.trim().toLowerCase())
      validationErrors.same =
        "Departure and arrival stations cannot be the same";
    if (!departureDate)
      validationErrors.departureDate = "Departure date is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setError(null);
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:5000/api/trains", {
        params: {
          from,
          to,
          departureDate,
          travellers,
        },
      });

      const filteredTrains =
        travelClass === "All Class"
          ? response.data
          : response.data.filter((train) => train.class === travelClass);

      navigate("/trainresultspage", {
        state: {
          trains: filteredTrains,
          passengers: travellers,
          travelClass,
          from,
          to,
          departureDate,
        },
      });
    } catch (err) {
      setError("Failed to fetch trains. Please try again later.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="train-search-container ">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-fields searchtrain">
          <div className="field">
            <label>From</label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Departure station"
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

          <div className="field">
            <label>To</label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Arrival station"
              className={errors.to || errors.same ? "error" : ""}
            />
            {errors.to && <div className="error-message">{errors.to}</div>}
            {errors.same && <div className="error-message">{errors.same}</div>}
          </div>

          <div className="field">
            <label>Departure Date</label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              min={today}
              className={errors.departureDate ? "error" : ""}
            />
            {departureDate && (
              <div className="date-info">
                {new Date(departureDate).toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            )}
            {errors.departureDate && (
              <div className="error-message">{errors.departureDate}</div>
            )}
          </div>

          <div className="field">
            <label>Travellers & Class</label>
            <div className="traveller-class-wrapper">
              <select
                value={travellers}
                onChange={(e) => setTravellers(Number(e.target.value))}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i + 1 === 1 ? "Traveller" : "Travellers"}
                  </option>
                ))}
              </select>
              <select
                value={travelClass}
                onChange={(e) => setTravelClass(e.target.value)}
              >
                <option value="All Class">All Class</option>
                <option value="Sleeper">Sleeper (SL)</option>
                <option value="AC 3rd Class">AC 3 Tier (3A)</option>
                <option value="AC 2nd Class">AC 2 Tier (2A)</option>
                <option value="AC 1st Class">AC 1st Class (1A)</option>
                <option value="AC Chair Car">AC Chair Car</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="search-button" disabled={loading}>
          {loading ? "Searching..." : "SEARCH TRAINS"}
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default TrainSearchApp;
