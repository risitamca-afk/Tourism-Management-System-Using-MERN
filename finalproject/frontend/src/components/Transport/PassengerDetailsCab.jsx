// PassengerDetailsCab.jsx

import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './PassengerDetailsCab.css'; // We'll write this CSS next

function PassengerDetailsCab() {
  const location = useLocation();
  const navigate = useNavigate();
  const cab = location.state?.cab;
  const passengers = location.state?.passengers || 1;

  const [formData, setFormData] = useState({
    name: '',
    pickupAddress: '',
    dropoffAddress: '',
    mobileNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/paymentcabpage', {
      state: { cab,passengers, formData }
    });
  };

  if (!cab) {
    return <div className="error-message">No cab selected.</div>;
  }

  return (
    <div className="passenger-details-page">
      <h2 className="details-title">Passenger Details</h2>

      <form className="passenger-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Pickup Address:
          <input
            type="text"
            name="pickupAddress"
            value={formData.pickupAddress}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Drop-off Address:
          <input
            type="text"
            name="dropoffAddress"
            value={formData.dropoffAddress}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Mobile Number:
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            pattern="[0-9]{10}"
            title="Enter 10 digit mobile number"
            required
          />
        </label>

        <button type="submit" className="submit-button">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default PassengerDetailsCab;
