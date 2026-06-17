import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // all Make sure this line is here
import "./BookingPage.css";
import Navbar from "../Navbar/Navbar";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData;

  if (!bookingData) {
    return;
  }

  return (
    <>
      <Navbar />
      <div className="payment-success-wrapper">
        <div className="payment-success-box">
          <h2>Booking Successful</h2>
          <p>Thank you</p>

          <div className="section-box">
            <h3>Booking Details</h3>
            <p>Username: {bookingData.username}</p>
            <p>Number of People: {bookingData.people}</p>
            <p>Date: {bookingData.date}</p>
            <p>Time: {bookingData.time}</p>
          </div>

          <button
            className="download-button"
            onClick={() => navigate("/landing")}
          >
            We Hope To See You Soon
          </button>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
