import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BusSearchApp() {
  const navigate = useNavigate();

  const [from, setFrom] = useState("Esplanade");
  const [to, setTo] = useState("Siliguri");
  const [departureDate, setDepartureDate] = useState("2025-05-11");
  const [travellers, setTravellers] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const today = new Date().toISOString().split("T")[0]; // Ensure that the minimum date is today's date.

  const handleSearch = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!from) validationErrors.from = "Departure city is required";
    if (!to) validationErrors.to = "Arrival city is required";
    if (from === to)
      validationErrors.same = "Departure and arrival cities cannot be the same";
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
      const response = await axios.get("http://localhost:5000/api/buses", {
        // Updated backend port to 5000
        params: {
          from,
          to,
          departureDate,
          travellers,
        },
      });

      if (response.data.length > 0) {
        navigate("/busresultspage", {
          state: {
            buses: response.data,
            travellers,
          },
        });
      } else {
        setError("No buses found for the selected route and date.");
      }
    } catch (err) {
      setError("Failed to fetch buses. Please try again.");
      console.error("Error fetching buses:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bus-search-container searchtrain">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-fields ">
          <div className="field from-field">
            <label>From</label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Enter departure city"
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
              placeholder="Enter arrival city"
              className={errors.to || errors.same ? "error" : ""}
            />
            {errors.to && <div className="error-message">{errors.to}</div>}
            {errors.same && <div className="error-message">{errors.same}</div>}
          </div>

          <div className="field date-field">
            <label>Departure Date</label>
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

          <div className="field travellers-field">
            <label>Travellers</label>
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
        </div>

        <button type="submit" className="search-button" disabled={loading}>
          {loading ? "Searching..." : "SEARCH BUSES"}
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default BusSearchApp;
