import React, { useState } from 'react';
import axios from 'axios';

function FlightForm() {
  const [flightData, setFlightData] = useState({
    airline: '',
    flightNumber: '',
    from: '',
    to: '',
    departureTime: '',
    arrivalTime: '',
    duration: '',
    price: '',
    date: '',
    class: '',
    seats: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData({
      ...flightData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/flights', {
        ...flightData,
        price: Number(flightData.price),
        seats: Number(flightData.seats),
        date: new Date(flightData.date)
      });

      console.log('✅ Flight data saved:', response.data);
      alert('Flight successfully saved!');
      setFlightData({
        airline: '',
        flightNumber: '',
        from: '',
        to: '',
        departureTime: '',
        arrivalTime: '',
        duration: '',
        price: '',
        date: '',
        class: '',
        seats: ''
      });
    } catch (error) {
      console.error('❌ Error saving flight data:', error);
      alert('Error saving flight data. Please check console.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: 'auto' }}>
      {[
        'Airline', 'Flight Number', 'From', 'To',
        'Departure Time', 'Arrival Time', 'Duration',
        'Price', 'Date', 'Class', 'Seats'
      ].map((label, i) => {
        const name = label.toLowerCase().replace(' ', '');
        const type = label === 'Price' || label === 'Seats' ? 'number' : label === 'Date' ? 'date' : 'text';

        return (
          <div key={i} style={{ marginBottom: '10px' }}>
            <label>{label}</label>
            <input
              type={type}
              name={name === 'flightnumber' ? 'flightNumber' : name}
              value={flightData[name === 'flightnumber' ? 'flightNumber' : name]}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
        );
      })}

      <button type="submit" style={{ padding: '10px 20px' }}>Submit</button>
    </form>
  );
}

export default FlightForm;
