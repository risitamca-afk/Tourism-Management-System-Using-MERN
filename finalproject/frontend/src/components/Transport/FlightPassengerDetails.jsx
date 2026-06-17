import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./PassengerDetailsPage.css";

function FlightPassengerDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, passengers, selectedSeats } = location.state || {};

  const [passengerDetails, setPassengerDetails] = useState(
    Array.from({ length: passengers }, () => ({
      name: "",
      age: "",
      gender: "",
      phone: "",
      mealPreference: "", // Added meal preference
    }))
  );

  const handleInputChange = (index, field, value) => {
    const updated = [...passengerDetails];
    updated[index][field] = value;
    setPassengerDetails(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/flightpaymentpage", {
      state: { flight, passengers, passengerDetails, selectedSeats },
    });
  };

  return (
    <div className="passenger-details-page">
      <h2>Passenger Information</h2>
      <form onSubmit={handleSubmit} className="passenger-form">
        {passengerDetails.map((p, i) => (
          <div key={i} className="passenger-card">
            <h4>
              Passenger {i + 1} - Seat {selectedSeats[i]}
            </h4>
            <input
              type="text"
              placeholder="Name"
              value={p.name}
              onChange={(e) => handleInputChange(i, "name", e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={p.age}
              onChange={(e) => handleInputChange(i, "age", e.target.value)}
              required
            />
            <select
              value={p.gender}
              onChange={(e) => handleInputChange(i, "gender", e.target.value)}
              required
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input
              type="tel"
              placeholder="Phone"
              value={p.phone}
              onChange={(e) => handleInputChange(i, "phone", e.target.value)}
              required
            />
            {/* Added meal preference field */}
            <select
              value={p.mealPreference}
              onChange={(e) =>
                handleInputChange(i, "mealPreference", e.target.value)
              }
              required
            >
              <option value="">Meal Preference</option>
              <option>Veg</option>
              <option>Non-Veg</option>
            </select>
          </div>
        ))}
        <button type="submit" className="submit-button">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}

export default FlightPassengerDetails;
