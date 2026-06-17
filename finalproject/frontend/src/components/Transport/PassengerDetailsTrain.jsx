import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './PassengerDetailsTrain.css';

function PassengerDetailsTrain() {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, passengers } = location.state || {};

  const [passengerDetails, setPassengerDetails] = useState(
    Array.from({ length: passengers }, () => ({
      name: '',
      age: '',
      gender: '',
      berthPreference: '',
      mealPreference: '',  // Added field for meal preference
    }))
  );

  const handleInputChange = (index, field, value) => {
    const updated = [...passengerDetails];
    updated[index][field] = value;
    setPassengerDetails(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/paymenttrainpage', {
      state: { train, passengers, passengerDetails }
    });
  };

  return (
    <div className="passenger-details-train-page">
      <h2>Passenger Information</h2>
      <form onSubmit={handleSubmit} className="passenger-form">
        {passengerDetails.map((p, i) => (
          <div key={i} className="passenger-card">
            <h4>Passenger {i + 1}</h4>
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
            <select 
              value={p.berthPreference} 
              onChange={(e) => handleInputChange(i, 'berthPreference', e.target.value)} 
              required
            >
              <option value="">Preferred Berth</option>
              <option>Upper Berth</option>
              <option>Middle Berth</option>
              <option>Lower Berth</option>
            </select>
            {/* Added meal preference option */}
            <select 
              value={p.mealPreference} 
              onChange={(e) => handleInputChange(i, 'mealPreference', e.target.value)} 
              required
            >
              <option value="">Meal Preference</option>
              <option>Veg</option>
              <option>Non-Veg</option>
            </select>
          </div>
        ))}
        <button type="submit" className="submit-button">Proceed to Payment</button>
      </form>
    </div>
  );
}

export default PassengerDetailsTrain;
