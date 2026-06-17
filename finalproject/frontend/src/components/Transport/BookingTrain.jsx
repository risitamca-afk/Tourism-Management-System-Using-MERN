import { useLocation, useNavigate } from 'react-router-dom';
import './BookingTrainPage.css'; // Remember to create the CSS file separately!

function BookingTrain() {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, passengers } = location.state || {};

  if (!train) {
    return <div>No train selected.</div>;
  }

  const handleConfirmBooking = () => {
    navigate('/passengerdetailstrainpage', {
      state: {
        train,
        passengers
      }
    });
  };

  return (
    <div className="booking-train-page">
      <h2>Confirm Your Train Booking</h2>
      <div className="train-summary">
        <p><strong>Train Name:</strong> {train.trainName}</p>
        <p><strong>Train Number:</strong> {train.trainNumber}</p>
        <p><strong>From:</strong> {train.from}</p>
        <p><strong>To:</strong> {train.to}</p>
        <p><strong>Departure Time:</strong> {train.departureTime}</p>
        <p><strong>Arrival Time:</strong> {train.arrivalTime}</p>
        <p><strong>Duration:</strong> {train.duration}</p>
        <p><strong>Class:</strong> {train.class}</p>
        <p><strong>Price (per passenger):</strong> ₹{train.price}</p>
        <p><strong>Passengers:</strong> {passengers}</p>
        <p><strong>Total:</strong> ₹{(train.price * passengers * 1.12).toFixed(0)}</p> {/* Assuming 5% taxes */}
      </div>
      <button className="confirm-button" onClick={handleConfirmBooking}>
        Confirm Booking
      </button>
    </div>
  );
}

export default BookingTrain;
