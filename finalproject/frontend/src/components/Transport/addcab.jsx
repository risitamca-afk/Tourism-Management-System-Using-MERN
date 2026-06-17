// src/components/CabForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function CabForm() {
  const [cabData, setCabData] = useState({
    tripType: '',
    cabName: '',
    cabNumber: '',
    rating: '',
    imageurl: '',
    from: '',
    to: '',
    date: '',
    pickupTime: '',
    duration: '',
    price: '',
    seatsAvailable: '',
    carType: '',
    amenities: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCabData(prev => ({
      ...prev,
      [name]: name === 'amenities' ? value.split(',') : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/cabs', cabData);
      alert('Cab data saved successfully!');
    } catch (err) {
      console.error('Error saving cab data:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="tripType" onChange={handleChange} required>
        <option value="">Select Trip Type</option>
        <option value="airportPickup">Airport Pickup</option>
        <option value="hourlyRental">Hourly Rental</option>
        <option value="outstationOneWay">Outstation One Way</option>
      </select>
      <input name="cabName" placeholder="Cab Name" onChange={handleChange} required />
      <input name="cabNumber" placeholder="Cab Number" onChange={handleChange} required />
      <input name="rating" placeholder="Rating" onChange={handleChange} />
      <input name="imageurl" placeholder="Image URL" onChange={handleChange} />
      <input name="from" placeholder="From" onChange={handleChange} required />
      <input name="to" placeholder="To (skip if hourly rental)" onChange={handleChange} />
      <input name="date" type="date" onChange={handleChange} required />
      <input name="pickupTime" placeholder="Pickup Time (if needed)" onChange={handleChange} />
      <input name="duration" placeholder="Duration (for hourly rental)" onChange={handleChange} />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
      <input name="seatsAvailable" type="number" placeholder="Seats Available" onChange={handleChange} required />
      <select name="carType" onChange={handleChange} required>
        <option value="">Select Car Type</option>
        <option value="Sedan">Sedan</option>
        <option value="SUV">SUV</option>
        <option value="Hatchback">Hatchback</option>
      </select>
      <input name="amenities" placeholder="Amenities (comma separated)" onChange={handleChange} />
      <button type="submit">Submit Cab</button>
    </form>
  );
}

export default CabForm;
