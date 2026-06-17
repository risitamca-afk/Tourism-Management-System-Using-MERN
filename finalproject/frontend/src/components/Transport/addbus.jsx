import React, { useState } from 'react';
import axios from 'axios';

function BusForm() {
  const [busData, setBusData] = useState({
    busName: '',
    busNumber: '',
    from: '',
    to: '',
    departureTime: '',
    arrivalTime: '',
    duration: '',
    price: '',
    date: '',
    class: '',
    seats: '',
    rating: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusData({ ...busData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure the price and seats are numbers
    const dataToSend = {
      ...busData,
      price: Number(busData.price),
      seats: Number(busData.seats),
      date: new Date(busData.date)  // Convert date to a Date object
    };

    axios.post('http://localhost:5000/api/buses', dataToSend)  // Updated backend port to 5000
      .then(res => {
        alert('Bus data saved successfully!');
      })
      .catch(err => {
        console.error('Error saving bus data:', err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="busName"
        placeholder="Bus Name"
        value={busData.busName}
        onChange={handleChange}
        required
      />
      <input
        name="busNumber"
        placeholder="Bus Number"
        value={busData.busNumber}
        onChange={handleChange}
        required
      />
      <input
        name="from"
        placeholder="From"
        value={busData.from}
        onChange={handleChange}
        required
      />
      <input
        name="to"
        placeholder="To"
        value={busData.to}
        onChange={handleChange}
        required
      />
      <input
        name="departureTime"
        placeholder="Departure Time"
        value={busData.departureTime}
        onChange={handleChange}
        required
      />
      <input
        name="arrivalTime"
        placeholder="Arrival Time"
        value={busData.arrivalTime}
        onChange={handleChange}
        required
      />
      <input
        name="duration"
        placeholder="Duration"
        value={busData.duration}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={busData.price}
        onChange={handleChange}
        required
      />
      <input
        name="date"
        type="date"
        value={busData.date}
        onChange={handleChange}
        required
      />
      <input
        name="class"
        placeholder="Class (e.g. AC, Non-AC)"
        value={busData.class}
        onChange={handleChange}
        required
      />
      <input
        name="seats"
        type="number"
        placeholder="Seats"
        value={busData.seats}
        onChange={handleChange}
        required
      />
      <input
        name="rating"
        placeholder="Rating (e.g. 4.5)"
        value={busData.rating}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit Bus</button>
    </form>
  );
}

export default BusForm;
