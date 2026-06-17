import { useLocation, useNavigate } from "react-router-dom";
import "./BookingBusPage.css"; // Remember to create this CSS file separately!

function BookingBus() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bus, passengers, selectedSeats } = location.state || {};

  if (!bus) {
    return <div>No bus selected.</div>;
  }

  const handleConfirmBooking = () => {
    navigate("/passengerdetailsbuspage", {
      state: {
        bus,
        passengers,
        selectedSeats,
      },
    });
  };

  return (
    <div className="booking-bus-page">
      <h2>Confirm Your Bus Booking</h2>
      <div className="bus-summary">
        <p>
          <strong>Bus Name:</strong> {bus.busName}
        </p>
        <p>
          <strong>Bus Number:</strong> {bus.busNumber}
        </p>
        <p>
          <strong>From:</strong> {bus.from}
        </p>
        <p>
          <strong>To:</strong> {bus.to}
        </p>
        <p>
          <strong>Departure Time:</strong> {bus.departureTime}
        </p>
        <p>
          <strong>Arrival Time:</strong> {bus.arrivalTime}
        </p>
        <p>
          <strong>Duration:</strong> {bus.duration}
        </p>
        <p>
          <strong>Price (per passenger):</strong> ₹{bus.price}
        </p>
        <p>
          <strong>Passengers:</strong> {passengers}
        </p>
        <p>
          <strong>Selected Seats:</strong> {selectedSeats.join(", ")}
        </p>
        <p>
          <strong>Total:</strong> ₹{(bus.price * passengers * 1.12).toFixed(0)}
        </p>{" "}
        {/* 5% tax */}
      </div>
      <button className="confirm-button" onClick={handleConfirmBooking}>
        Confirm Booking
      </button>
    </div>
  );
}

export default BookingBus;
