import React, { useState } from 'react';
import axios from 'axios';

function TrainForm() {
  const [trainData, setTrainData] = useState({
    trainName: '',
    trainNumber: '',
    from: '',
    to: '',
    departureTime: '',
    arrivalTime: '',
    date: '', // Ensure the date is in the correct format
    price: '',
    class: '',
    seats: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainData({ ...trainData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure the data matches backend model
    axios.post('http://localhost:5000/api/trains', trainData) // Make sure the backend URL is correct
      .then((res) => {
        alert('Train data saved successfully!');
        setTrainData({
          trainName: '',
          trainNumber: '',
          from: '',
          to: '',
          departureTime: '',
          arrivalTime: '',
          date: '',
          price: '',
          class: '',
          seats: '',
        });
      })
      .catch((err) => {
        console.error('Error saving train data:', err);
      });
  };

  return (
    <div>
      <h2>Add a New Train</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Train Name:</label>
          <input
            type="text"
            name="trainName"
            value={trainData.trainName}
            onChange={handleChange}
            placeholder="Train Name"
            required
          />
        </div>

        <div>
          <label>Train Number:</label>
          <input
            type="text"
            name="trainNumber"
            value={trainData.trainNumber}
            onChange={handleChange}
            placeholder="Train Number"
            required
          />
        </div>

        <div>
          <label>From (Departure Station):</label>
          <input
            type="text"
            name="from"
            value={trainData.from}
            onChange={handleChange}
            placeholder="From"
            required
          />
        </div>

        <div>
          <label>To (Arrival Station):</label>
          <input
            type="text"
            name="to"
            value={trainData.to}
            onChange={handleChange}
            placeholder="To"
            required
          />
        </div>

        <div>
          <label>Departure Time:</label>
          <input
            type="text"
            name="departureTime"
            value={trainData.departureTime}
            onChange={handleChange}
            placeholder="Departure Time"
            required
          />
        </div>

        <div>
          <label>Arrival Time:</label>
          <input
            type="text"
            name="arrivalTime"
            value={trainData.arrivalTime}
            onChange={handleChange}
            placeholder="Arrival Time"
            required
          />
        </div>

        <div>
          <label>Journey Date:</label>
          <input
            type="date"
            name="date"
            value={trainData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={trainData.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
        </div>

        <div>
          <label>Class (e.g., Sleeper, AC 2AC, etc.):</label>
          <input
            type="text"
            name="class"
            value={trainData.class}
            onChange={handleChange}
            placeholder="Class"
            required
          />
        </div>

        <div>
          <label>Seats Available:</label>
          <input
            type="number"
            name="seats"
            value={trainData.seats}
            onChange={handleChange}
            placeholder="Seats Available"
            required
          />
        </div>

        <div>
          <button type="submit">Submit Train</button>
        </div>
      </form>
    </div>
  );
}

export default TrainForm;
