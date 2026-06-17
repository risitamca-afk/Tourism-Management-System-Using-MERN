import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./TrainResultsPage.css";
import { TramFront } from "lucide-react";
function TrainResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const allTrains = location.state?.trains || [];
  const passengers = location.state?.passengers || 1;

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

  const trainClasses = ["Sleeper", "AC Chair Car", "AC 1A", "AC 2A", "AC 3A"];

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

  const filterTrains = () => {
    return allTrains.filter((train) => {
      const matchesPrice =
        !selectedPriceRange ||
        (train.price >= selectedPriceRange.min &&
          train.price < selectedPriceRange.max);

      const matchesClass =
        selectedClasses.length === 0 || selectedClasses.includes(train.class);

      return matchesPrice && matchesClass;
    });
  };

  const handleBack = () => {
    navigate("/trainsearchpage");
  };

  const handleBookNow = (train) => {
    navigate("/trainbookingpage", {
      state: {
        train,
        passengers,
      },
    });
  };

  const filteredTrains = filterTrains();

  return (
    <div className="train-results-container">
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
        {trainClasses.map((className, index) => (
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

      {/* Train Results Section */}
      <div className="train-results-page">
        <h2 className="results-title font-bold text-2xl">Train Search Results</h2>
        <button className="back-button" onClick={handleBack}>
          ← Back to Search
        </button>

        {filteredTrains.length === 0 ? (
          <div className="no-results">
            No trains found for the selected criteria.
          </div>
        ) : (
          <div className="train-list">
            {filteredTrains.map((train, index) => (
              <div className="train-card" key={index}>
                <div className="train-header">
                  <div className="train-name">
                    <TramFront /> {train.trainName}
                  </div>
                </div>

                <div className="train-route">
                  <div className="train-times">
                    <div>
                      {train.departureTime} → {train.arrivalTime}
                    </div>
                  </div>
                  <div className="train-destination">
                    {train.from} ➔ {train.to}
                  </div>
                </div>

                <div className="train-footer">
                  <div className="train-price">₹{train.price}</div>
                  <button
                    className="book-now-btn"
                    onClick={() => handleBookNow(train)}
                  >
                    Book Now
                  </button>
                  <div className="train-seats">
                    Seats Available: {train.seats}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TrainResults;
