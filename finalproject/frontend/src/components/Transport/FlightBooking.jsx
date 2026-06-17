import { useLocation, useNavigate } from "react-router-dom";
import "./BookingPage.css";
import { useState } from "react";

function FlightBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, passengers, selectedSeats } = location.state || {};

  const [promoCode, setPromoCode] = useState("");

  if (!flight) {
    return <div>No flight selected.</div>;
  }

  const baseFare = flight.price * passengers;
  const taxes = Math.round(baseFare * 0.12);
  const total = baseFare + taxes;

  const handleConfirmBooking = () => {
    navigate("/flightpassengerdetailspage", {
      state: {
        flight,
        passengers,
        selectedSeats,
      },
    });
  };

  return (
    <div className="booking-page">
      <h2>Confirm Your Booking</h2>
      <div className="flight-summary">
        <p>
          <strong>Airline:</strong> {flight.airline}
        </p>
        <p>
          <strong>Flight Number:</strong> {flight.flightNumber}
        </p>
        <p>
          <strong>From:</strong> {flight.from}
        </p>
        <p>
          <strong>To:</strong> {flight.to}
        </p>
        <p>
          <strong>Departure:</strong> {flight.departureTime}
        </p>
        <p>
          <strong>Arrival:</strong> {flight.arrivalTime}
        </p>
        <p>
          <strong>Duration:</strong> {flight.duration}
        </p>
        <p>
          <strong>Price (per passenger):</strong> ₹{flight.price}
        </p>
        <p>
          <strong>Passengers:</strong> {passengers}
        </p>
        <p>
          <strong>Total Price (including gst):</strong> ₹
          {flight.price + flight.price * 0.12}
        </p>
        <p>
          <strong>Selected Seats:</strong> {selectedSeats.join(", ")}
        </p>

        <button className="confirm-button" onClick={handleConfirmBooking}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default FlightBooking;
