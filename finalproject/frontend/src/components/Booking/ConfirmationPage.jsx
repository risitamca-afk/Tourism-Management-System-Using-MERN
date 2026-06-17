import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ConfirmationPage.css";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the state passed from the PassengerDetailsForm
  const { passengerDetails, flight, formData, paymentId } = location.state || {};

  if (!passengerDetails || !flight || !paymentId) {
    return (
      <div className="confirmation-page">
        <h2>Invalid Access</h2>
        <p>It seems you have landed on this page incorrectly.</p>
        <button onClick={() => navigate("/")}>Go to Home</button>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <h2 >Booking Confirmation</h2>
      <p className="h21">Thank you for booking with us! Your payment was successful.</p>
      <div className="booking-summary">
        <h3>Booking Details</h3>
        <p><strong>Flight:</strong> {flight.airline}</p>
        <p><strong>From:</strong> {flight.departure}</p>
        <p><strong>To:</strong> {flight.arrival}</p>
        <p><strong>Price:</strong> {flight.price}</p>
        <p><strong>Payment ID:</strong> {paymentId}</p>
      </div>

      <div className="passenger-details">
        <h3>Passenger Details</h3>
        {passengerDetails.map((passenger, index) => (
          <div key={index} className="passenger-card">
            <h4>Passenger {index + 1}</h4>
            <p><strong>Name:</strong> {passenger.name}</p>
            <p><strong>Age:</strong> {passenger.age}</p>
            <p><strong>Gender:</strong> {passenger.gender}</p>
            <p><strong>Mobile:</strong> {passenger.mobile}</p>
          </div>
        ))}
      </div>

      <button className="home-button" onClick={() => navigate("/landing")}>
        Go to Home
      </button>
    </div>
  );
};

export default ConfirmationPage;
