import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Bookings.css';

const Bookings = () => {
  const [flightBookings, setFlightBookings] = useState([]);
  const [trainBookings, setTrainBookings] = useState([]);
  const [busBookings, setBusBookings] = useState([]);
  const [cabBookings, setCabBookings] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const [flightsRes, trainsRes, busesRes, cabsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/flight-bookings'),
          axios.get('http://localhost:5000/api/train-bookings'),
          axios.get('http://localhost:5000/api/bus-bookings'),
          axios.get('http://localhost:5000/api/cab-bookings')
        ]);
        setFlightBookings(flightsRes.data);
        setTrainBookings(trainsRes.data);
        setBusBookings(busesRes.data);
        setCabBookings(cabsRes.data);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      }
    };

    fetchAllBookings();
  }, []);

  const handleCancelBooking = (bookingId, bookingType) => {
    setBookingToDelete({ bookingId, bookingType });
    setShowConfirm(true);
  };

  const cancelBooking = async () => {
    try {
      const { bookingId, bookingType } = bookingToDelete;
      let response;

      if (bookingType === 'flight') {
        response = await axios.delete(`http://localhost:5000/api/flight-bookings/${bookingId}`);
      } else if (bookingType === 'train') {
        response = await axios.delete(`http://localhost:5000/api/train-bookings/${bookingId}`);
      } else if (bookingType === 'bus') {
        response = await axios.delete(`http://localhost:5000/api/bus-bookings/${bookingId}`);
      } else if (bookingType === 'cab') {
        response = await axios.delete(`http://localhost:5000/api/cab-bookings/${bookingId}`);
      }

      if (response.status === 200) {
        alert('Booking cancelled successfully');
        window.location.reload();
      }
    } catch (err) {
      console.error('Error canceling booking:', err);
      alert('Error canceling booking');
    } finally {
      setShowConfirm(false);
    }
  };

  const closePopup = () => {
    setShowConfirm(false);
  };

  const noBookings =
    flightBookings.length === 0 &&
    trainBookings.length === 0 &&
    busBookings.length === 0 &&
    cabBookings.length === 0;

  return (
    <div className="bookings-wrapper">
      <h2>📘 My Bookings</h2>

      {noBookings && <p>No bookings found.</p>}

      {/* Flight Bookings */}
      {flightBookings.length > 0 && (
        <>
          <h3>✈️ Flight Bookings</h3>
          <div className="bookings-list">
            {flightBookings.map((booking, index) => (
              <div className="booking-card" key={`flight-${index}`}>
                <h4>{booking.airline} - {booking.flightNumber}</h4>
                <p><strong>From:</strong> {booking.from}</p>
                <p><strong>To:</strong> {booking.to}</p>
                <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString('en-GB')}</p>
                <p><strong>Departure:</strong> {booking.departureTime}</p>
                <p><strong>Arrival:</strong> {booking.arrivalTime}</p>
                <p><strong>Payment ID:</strong> {booking.paymentId}</p>
                <button onClick={() => handleCancelBooking(booking.flightId, 'flight')}>Cancel Booking</button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Train Bookings */}
      {trainBookings.length > 0 && (
        <>
          <h3>🚆 Train Bookings</h3>
          <div className="bookings-list">
            {trainBookings.map((booking, index) => (
              <div className="booking-card" key={`train-${index}`}>
                <h4>{booking.trainName} - {booking.trainNumber}</h4>
                <p><strong>From:</strong> {booking.from}</p>
                <p><strong>To:</strong> {booking.to}</p>
                <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString('en-GB')}</p>
                <p><strong>Departure Time:</strong> {booking.departureTime}</p>
                <p><strong>Arrival Time:</strong> {booking.arrivalTime}</p>
                <p><strong>Payment ID:</strong> {booking.paymentId}</p>
                <button onClick={() => handleCancelBooking(booking.trainId, 'train')}>Cancel Booking</button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Bus Bookings */}
      {busBookings.length > 0 && (
        <>
          <h3>🚌 Bus Bookings</h3>
          <div className="bookings-list">
            {busBookings.map((booking, index) => (
              <div className="booking-card" key={`bus-${index}`}>
                <h4>{booking.busName} - {booking.busNumber}</h4>
                <p><strong>From:</strong> {booking.from}</p>
                <p><strong>To:</strong> {booking.to}</p>
                <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString('en-GB')}</p>
                <p><strong>Departure Time:</strong> {booking.departureTime}</p>
                <p><strong>Arrival Time:</strong> {booking.arrivalTime}</p>
                <p><strong>Payment ID:</strong> {booking.paymentId}</p>
                <button onClick={() => handleCancelBooking(booking.BusId, 'bus')}>Cancel Booking</button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Cab Bookings */}
      {cabBookings.length > 0 && (
        <>
          <h3>🚖 Cab Bookings</h3>
          <div className="bookings-list">
            {cabBookings.map((booking, index) => (
              <div className="booking-card" key={`cab-${index}`}>
                <h4>{booking.cabName} - {booking.cabNumber}</h4>
                <p><strong>From:</strong> {booking.from}</p>
                <p><strong>To:</strong> {booking.to}</p>
                <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString('en-GB')}</p>
                <p><strong>Car Type:</strong> {booking.carType}</p>
                <p><strong>Payment ID:</strong> {booking.paymentId}</p>
                <button onClick={() => handleCancelBooking(booking.CabId, 'cab')}>Cancel Booking</button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="confirm-popup">
          <div className="popup-content">
            <h3>Are you sure you want to cancel this booking?</h3>
            <button onClick={cancelBooking}>Yes</button>
            <button onClick={closePopup}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
