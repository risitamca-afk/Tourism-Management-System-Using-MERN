import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./BusResultsPage.css";

function BusResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const allBuses = location.state?.buses || [];
  const passengers = location.state?.passengers || 1;

  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  const priceRanges = [
    { label: "₹ 0 - ₹ 4000", min: 0, max: 4000 },
    { label: "₹ 4000 - ₹ 8000", min: 4000, max: 8000 },
    { label: "₹ 8000 - ₹ 12000", min: 8000, max: 12000 },
    { label: "₹ 12000 - ₹ 15000", min: 12000, max: 15000 },
    { label: "₹ 15000 - ₹ 30000", min: 15000, max: 30000 },
    { label: "₹ 30000+", min: 30000, max: Infinity },
  ];

  const handlePriceChange = (range) => {
    const exists = selectedPriceRanges.find(
      (r) => r.min === range.min && r.max === range.max
    );

    if (exists) {
      setSelectedPriceRanges(
        selectedPriceRanges.filter(
          (r) => r.min !== range.min || r.max !== range.max
        )
      );
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, range]);
    }
  };

  const handleRatingChange = (value) => {
    setSelectedRating(value === selectedRating ? null : value); // Toggle
  };

  const filterBuses = () => {
    return allBuses.filter((bus) => {
      const priceMatch =
        selectedPriceRanges.length === 0 ||
        selectedPriceRanges.some(
          (range) => bus.price >= range.min && bus.price < range.max
        );

      const ratingMatch =
        selectedRating === null || bus.rating >= selectedRating;

      return priceMatch && ratingMatch;
    });
  };

  const handleBack = () => {
    navigate("/bussearchpage");
  };

  const handleBookNow = (bus) => {
    navigate("/busseatselectPage", {
      state: {
        bus,
        passengers,
      },
    });
  };

  const filteredBuses = filterBuses();

  return (
    <div className="bus-results-container">
      <div className="filter-sidebar">
        <h4>Price per night</h4>
        {priceRanges.map((range, index) => (
          <label key={index} className="filter-option">
            <input
              type="checkbox"
              checked={selectedPriceRanges.some(
                (r) => r.min === range.min && r.max === range.max
              )}
              onChange={() => handlePriceChange(range)}
            />
            {range.label}
          </label>
        ))}

        <h4>Rating</h4>
        {[3, 4, 5].map((rating) => (
          <label key={rating} className="filter-option">
            <input
              type="radio"
              name="rating"
              checked={selectedRating === rating}
              onChange={() => handleRatingChange(rating)}
            />
            {rating}+
          </label>
        ))}
      </div>

      <div className="bus-results-page">
        <h2 className="results-title font-bold text-2xl">Bus Search Results</h2>
        <button className="back-button" onClick={handleBack}>
          ← Back to Search
        </button>

        {filteredBuses.length === 0 ? (
          <div className="no-results">No buses match your filter criteria.</div>
        ) : (
          <div className="bus-list">
            {filteredBuses.map((bus, index) => (
              <div className="bus-card" key={index}>
                <div className="bus-header">
                  <div className="bus-name">{bus.busName}</div>
                  <div className="bus-rating">⭐ {bus.rating}/5</div>
                </div>

                <div className="bus-route">
                  <div className="bus-times">
                    <div>
                      {bus.departureTime} → {bus.arrivalTime}
                    </div>
                  </div>
                  <div className="bus-destination">
                    {bus.from} ➔ {bus.to}
                  </div>
                </div>

                <div className="bus-footer">
                  <div className="bus-price">₹{bus.price}</div>
                  <button
                    className="book-now-btn"
                    onClick={() => handleBookNow(bus)}
                  >
                    Select Seat
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

export default BusResults;
