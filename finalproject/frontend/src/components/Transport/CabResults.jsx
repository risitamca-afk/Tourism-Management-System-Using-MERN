import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./CabResultsPage.css";

const priceRanges = [
  { label: "₹ 0 - ₹ 4000", min: 0, max: 4000 },
  { label: "₹ 4000 - ₹ 8000", min: 4000, max: 8000 },
  { label: "₹ 8000 - ₹ 12000", min: 8000, max: 12000 },
  { label: "₹ 12000 - ₹ 15000", min: 12000, max: 15000 },
  { label: "₹ 15000 - ₹ 30000", min: 15000, max: 30000 },
  { label: "₹ 30000+", min: 30000, max: Infinity },
];

const ratingOptions = [3, 4, 5];

function CabResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const cabs = location.state?.cabs || [];
  const passengers = location.state?.passengers || 1;

  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);

  const handleBack = () => navigate("/cabsearchpage");

  const handleBookNow = (cab) => {
    let targetRoute = "/cab-details";
    const map = {
      "Indica-Swift": "/cab-details-in",
      "Xylo-Ertiga": "/cab-details-xy",
      "Dzire-Etios": "/cab-details-dz",
      "Toyota-Innova": "/cab-details-to",
      "Innova-Crysta": "/cab-details-inn",
    };
    if (map[cab.cabName]) targetRoute = map[cab.cabName];

    navigate(targetRoute, { state: { cab, passengers } });
  };

  const togglePriceFilter = (range) => {
    setSelectedPrice((prev) => (prev === range.label ? null : range.label));
  };

  const toggleRatingFilter = (rating) => {
    setSelectedRating((prev) => (prev === rating ? null : rating));
  };

  const filteredCabs = cabs.filter((cab) => {
    const matchesPrice =
      !selectedPrice ||
      (() => {
        const { min, max } = priceRanges.find((r) => r.label === selectedPrice);
        return cab.price >= min && cab.price < max;
      })();

    const matchesRating = !selectedRating || cab.rating >= selectedRating;

    return matchesPrice && matchesRating;
  });

  return (
    <div className="cab-results-container">
      <div className="filters-section">
        <h4>Price per ride</h4>
        {priceRanges.map((range) => (
          <div key={range.label}>
            <input
              type="checkbox"
              checked={selectedPrice === range.label}
              onChange={() => togglePriceFilter(range)}
            />
            <label>{range.label}</label>
          </div>
        ))}

        <h4 style={{ marginTop: "20px" }}>Minimum Rating</h4>
        {ratingOptions.map((rating) => (
          <div key={rating}>
            <input
              type="checkbox"
              checked={selectedRating === rating}
              onChange={() => toggleRatingFilter(rating)}
            />
            <label>{rating}★+</label>
          </div>
        ))}
      </div>

      <div className="cab-results-page">
        <h2 className="results-title">Cab Search Results</h2>
        <button className="back-button" onClick={handleBack}>
          ← Back to Search
        </button>

        {filteredCabs.length === 0 ? (
          <div className="no-results">
            No cabs found for the selected filters.
          </div>
        ) : (
          <div className="cab-list">
            {filteredCabs.map((cab, index) => (
              <div className="cab-card" key={index}>
                <div className="cab-image">
                  <img src={cab.imageurl} alt={cab.cabName} />
                  <span className="badge">CNG</span>
                </div>

                <div className="cab-summary-details">
                  <div className="cab-header">
                    <h3>{cab.cabName}</h3>
                    <span className="cab-rating">{cab.rating}/5</span>
                  </div>
                  <div className="cab-tags">
                    <span className="tag">{cab.carType}</span>
                    <span className="tag">AC</span>
                    <span className="tag">{cab.seatsAvailable} seats</span>
                  </div>
                  <ul className="cab-features">
                    <li>
                      ✅ {cab.kmsIncluded || 501} kms included. After that ₹
                      {cab.extraRate || 18}/km
                    </li>
                    <li>✅ Free cancellation until 1 hour before pickup</li>
                    <li>⛽ CNG Car</li>
                  </ul>
                </div>

                <div className="cab-footer">
                  <div className="cab-original-price">
                    ₹{cab.price + cab.price * 0.1}
                  </div>
                  <div className="cab-discount">10% off</div>
                  <div className="cab-price">₹{cab.price}</div>
                  <div className="cab-tax">+{cab.price * 0.12}(Taxes)</div>
                  <button
                    className="book-now-btn"
                    onClick={() => handleBookNow(cab)}
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

export default CabResults;
