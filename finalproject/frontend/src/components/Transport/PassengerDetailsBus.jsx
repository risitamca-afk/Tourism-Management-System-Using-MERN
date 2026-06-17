// src/components/PassengerDetailsBus.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './PassengerDetailsBus.css';

function PassengerDetailsBus() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bus, passengers, selectedSeats } = location.state || {};

  const [passengerDetails, setPassengerDetails] = useState(
    Array.from({ length: passengers }, () => ({
      name: '',
      age: '',
      gender: ''
    }))
  );

  const handleInputChange = (index, field, value) => {
    const updated = [...passengerDetails];
    updated[index][field] = value;
    setPassengerDetails(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/paymentbuspage', {
      state: { bus, passengers, selectedSeats, passengerDetails }
    });
  };

  return (
    <div className="passenger-details-bus-page">
      <h2>Passenger Information</h2>
      <form onSubmit={handleSubmit} className="passenger-form">
        {passengerDetails.map((p, i) => (
          <div key={i} className="passenger-card">
            <h4>Passenger {i + 1} - Seat {selectedSeats[i]}</h4>
            <input 
              type="text" 
              placeholder="Name" 
              value={p.name} 
              onChange={(e) => handleInputChange(i, 'name', e.target.value)} 
              required 
            />
            <input 
              type="number" 
              placeholder="Age" 
              value={p.age} 
              onChange={(e) => handleInputChange(i, 'age', e.target.value)} 
              required 
            />
            <select 
              value={p.gender} 
              onChange={(e) => handleInputChange(i, 'gender', e.target.value)} 
              required
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        ))}
        <button type="submit" className="submit-button">Proceed to Payment</button>
      </form>
    </div>
  );
}

export default PassengerDetailsBus;
