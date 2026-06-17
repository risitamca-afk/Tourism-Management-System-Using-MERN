import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './BusSeatSelect.css';

const BusSeatSelect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { passengers, bus } = location.state || {};

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const leftSeats = [
    [1, 2],
    [6, 7],
    [11, 12],
    [16, 17],
    [21, 22],
    [26, 27],
    [31, 32],
    [36, 37],
  ];

  const rightSeats = [
    [3, 4, 5],
    [8, 9, 10],
    [13, 14, 15],
    [18, 19, 20],
    [23, 24, 25],
    [28, 29, 30],
    [33, 34, 35],
    [38, 39, 40],
  ];

  useEffect(() => {
    if (bus && bus._id) {
      fetchBookedSeats();
    }
  }, [bus]);

  const fetchBookedSeats = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/bus-seats/${bus._id}`);
      setBookedSeats(res.data || []);
    } catch (err) {
      console.error('Error fetching booked seats:', err);
    }
  };

  const handleSeatSelection = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : (prev.length < passengers ? [...prev, seatNumber] : prev)
    );
  };

  const isSeatSelectable = (seatNumber) =>
    !bookedSeats.includes(seatNumber) &&
    (selectedSeats.includes(seatNumber) || selectedSeats.length < passengers);

  const handleNext = async () => {
    if (selectedSeats.length !== passengers) {
      alert(`Please select exactly ${passengers} seat(s).`);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/bus-seats/book', {
        busId: bus._id,
        selectedSeats,
      });

      // Navigate to next booking page
      navigate('/bookingbuspage', {
        state: { bus, selectedSeats, passengers },
      });
    } catch (err) {
      console.error(err);
      if (err.response?.status === 400) {
        alert(err.response.data.message || 'Some seats are already booked.');
        fetchBookedSeats();
        setSelectedSeats([]);
      } else {
        alert('Booking failed. Try again later.');
      }
    }
  };

  const renderSeatButton = (seat) => {
    const isBooked = bookedSeats.includes(seat);
    const isSelected = selectedSeats.includes(seat);

    return (
      <button
        key={seat}
        className={`seat ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
        disabled={!isSeatSelectable(seat)}
        onClick={() => handleSeatSelection(seat)}
      >
        {isBooked ? 'X' : seat}
      </button>
    );
  };

  const totalPrice = bus.price * passengers;
  const tax = totalPrice * 0.12;
  const grandTotal = totalPrice + tax;

  return (
    <div className="seat-selection-page">
      <h1>Select Your Seats</h1>
      <p>Select exactly {passengers} seat(s)</p>

      <div className="layout-wrapper">
        <div className="bus-layout">
          <div className="seat-side">
            <div className="seat-grid">
              <div className="seat-row">
                <div className="empty-driver-placeholder"></div>
              </div>
              {leftSeats.map((row, i) => (
                <div className="seat-row" key={`left-${i}`}>
                  {row.map(renderSeatButton)}
                </div>
              ))}
            </div>
          </div>

          <div className="seat-gap" />

          <div className="seat-side">
            <div className="seat-grid">
              <div className="seat-row">
                <div className="driver-seat">Driver</div>
              </div>
              {rightSeats.map((row, i) => (
                <div className="seat-row" key={`right-${i}`}>
                  {row.map(renderSeatButton)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="fare-summary-card">
          <div className="fare-box">
            <h3>Fare Summary</h3>
            <div className="fare-item">
              <span>Base Fare</span><span>₹ {totalPrice}</span>
            </div>
            <div className="fare-item">
              <span>Taxes & Surcharges</span><span>₹ {tax.toFixed(2)}</span>
            </div>
            <hr />
            <div className="fare-total">
              <strong>Total</strong><strong>₹ {grandTotal.toFixed(2)}</strong>
            </div>
          </div>

          <div className="promo-box">
            <div className="promo-header">
              <span>PROMO CODES</span>
              <span role="img" aria-label="gift">🎁</span>
            </div>
            <input type="text" placeholder="Enter promo code here" />
            <a href="#" className="view-coupons">VIEW ALL COUPONS</a>
          </div>
        </div>
      </div>

      <button className="proceed-btn" onClick={handleNext}>
        Proceed to Booking
      </button>
    </div>
  );
};

export default BusSeatSelect;
