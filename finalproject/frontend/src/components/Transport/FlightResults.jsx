import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./FlightResultsPage.css";

function FlightResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const allFlights = location.state?.flights || [];
  const passengers = location.state?.passengers || 1;

  const initialFrom = location.state?.search?.from || "";
  const initialTo = location.state?.search?.to || "";
  const initialDepartDate = location.state?.search?.departDate || "";
  const initialPassengers = location.state?.passenger || 1;
  const [passenger, setPassengers] = useState(initialPassengers);
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [departDate, setDepartDate] = useState(initialDepartDate);

  // Filters
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedClasses, setSelectedClasses] = useState([]);

  const priceRanges = [
    { label: "₹ 0 - ₹ 4000", min: 0, max: 4000 },
    { label: "₹ 4000 - ₹ 8000", min: 4000, max: 8000 },
    { label: "₹ 8000 - ₹ 12000", min: 8000, max: 12000 },
    { label: "₹ 12000 - ₹ 15000", min: 12000, max: 15000 },
    { label: "₹ 15000 - ₹ 30000", min: 15000, max: 30000 },
    { label: "₹ 30000+", min: 30000, max: Infinity },
  ];

  const flightClasses = ["Economy", "Premium Economy", "Business Economy"];

  const handlePriceChange = (range) => {
    setSelectedPriceRange(selectedPriceRange?.min === range.min ? null : range);
  };

  const handleClassChange = (className) => {
    if (selectedClasses.includes(className)) {
      setSelectedClasses(selectedClasses.filter((c) => c !== className));
    } else {
      setSelectedClasses([...selectedClasses, className]);
    }
  };

  const filterFlights = () => {
    return allFlights.filter((flight) => {
      const matchesPrice =
        !selectedPriceRange ||
        (flight.price >= selectedPriceRange.min &&
          flight.price < selectedPriceRange.max);

      const matchesClass =
        selectedClasses.length === 0 || selectedClasses.includes(flight.class);

      return matchesPrice && matchesClass;
    });
  };

  const handleSearchAgain = () => {
    navigate("/results", {
      state: {
        from,
        to,
        departDate,
        passenger,
      },
    });
  };

  const handleBack = () => {
    navigate("/transportpage");
  };

  const handleBookNow = (flight) => {
    navigate("/flightseatselectpage", {
      state: {
        flight,
        passengers,
      },
    });
  };

  const filteredFlights = filterFlights();

  return (
    <div className="flight-results-container">
      {/* Sidebar Filters */}
      <div className="filter-sidebar">
        <h4>Price per night</h4>
        {priceRanges.map((range, index) => (
          <label key={index} className="filter-option">
            <input
              type="checkbox"
              checked={selectedPriceRange?.min === range.min}
              onChange={() => handlePriceChange(range)}
            />
            {range.label}
          </label>
        ))}

        <h4>Class</h4>
        {flightClasses.map((className, index) => (
          <label key={index} className="filter-option">
            <input
              type="checkbox"
              checked={selectedClasses.includes(className)}
              onChange={() => handleClassChange(className)}
            />
            {className}
          </label>
        ))}
      </div>

      {/* Results Section */}
      <div className="flight-results-page">
        <div className="search-box">
          <select value="One Way" disabled>
            <option>One Way</option>
          </select>
          <input
            type="text"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            type="text"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <input
            type="date"
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
          />
          <input
            type="number"
            min="1"
            value={passenger}
            onChange={(e) => setPassengers(e.target.value)}
          />
          <button onClick={handleSearchAgain}>Search</button>
        </div>

        <h2 className="results-title">Flight Search Results</h2>
        <button className="back-button" onClick={handleBack}>
          ← Back to Search
        </button>

        {filteredFlights.length === 0 ? (
          <div className="no-results">
            No flights found for the selected criteria.
          </div>
        ) : (
          <div className="flight-list">
            {filteredFlights.map((flight, index) => (
              <div className="flight-card" key={index}>
                <div className="flight-details">
                  <div className="flight-info pb-10">
                    <h3 className="font-extrabold">{flight.airline}</h3>
                    <p>{flight.flightNumber}</p>
                  </div>
                  <div className="flight-time">
                    <span>{flight.departureTime}</span>
                    <span>→</span>
                    <span>{flight.arrivalTime}</span>
                  </div>
                  <div className="flight-route">
                    <span>{flight.from}</span> - <span>{flight.to}</span>
                  </div>
                </div>
                <div className="flight-price">
                  <p>₹ {flight.price}</p>
                  <button
                    className="book-button"
                    onClick={() => handleBookNow(flight)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FlightResults;
