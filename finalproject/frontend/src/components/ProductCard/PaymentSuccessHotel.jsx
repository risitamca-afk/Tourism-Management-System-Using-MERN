import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import axios from "axios";
import "./PaymentSuccessHotel.css";
import { useAuthStore } from "../../store/auth.store";

const PaymentSuccessHotel = () => {
  const { user } = useAuthStore();
  const location = useLocation();
  const {
    hotelName,
    Place,
    roomType,
    roomCount,
    checkInDate,
    checkOutDate,
    paymentId,
    username,
  } = location.state || {};

  const bookingSavedRef = useRef(false);

  useEffect(() => {
    const saveHotelBooking = async () => {
      if (!hotelName || !roomType || !paymentId || bookingSavedRef.current)
        return;

      try {
        await axios.post("http://localhost:5000/api/hotelbooking/hotel-bookings", {
          username: user.name || "guest",
          hotelId: location.state.hotelId, // Make sure this exists
          hotelName,
          Place,
          roomType,
          roomCount,
          paymentId,
          checkInDate,
          checkOutDate,
        });

        bookingSavedRef.current = true;
        console.log("Hotel booking saved to database");
      } catch (error) {
        console.error("Error saving hotel booking:", error);
      }
    };

    saveHotelBooking();
  }, [
    hotelName,
    roomType,
    paymentId,
    roomCount,
    checkInDate,
    checkOutDate,
    username,
  ]);

  const handleDownload = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const qrLink = window.location.origin;
    const qrDataURL = await QRCode.toDataURL(qrLink);

    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277);

    doc.setFontSize(22);
    doc.setTextColor(40, 100, 200);
    doc.text("Hotel Booking Ticket", 105, 25, { align: "center" });
    doc.line(10, 30, 200, 30);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Hotel Details:", 15, 40);

    doc.setFontSize(12);
    doc.text(`Hotel: ${hotelName}`, 15, 48);
    doc.text(`Place: ${Place}`, 15, 56);
    doc.text(`Room Type: ${roomType}`, 15, 64);
    doc.text(`Rooms: ${roomCount}`, 15, 72);
    doc.text(
      `Check-In: ${new Date(checkInDate).toLocaleDateString("en-GB")}`,
      15,
      80
    );
    doc.text(
      `Check-Out: ${new Date(checkOutDate).toLocaleDateString("en-GB")}`,
      15,
      88
    );
    doc.text(`Payment ID: ${paymentId}`, 15, 96);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);
    doc.text("Scan QR to Book Again:", 15, 110);
    doc.addImage(qrDataURL, "PNG", 15, 115, 50, 50);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for booking with us! Enjoy your stay!", 105, 290, {
      align: "center",
    });

    doc.save("hotel_booking.pdf");
  };

  if (!hotelName || !roomType || !paymentId) {
    return (
      <div className="payment-success-wrapper">
        <div className="payment-success-box">
          <h2>Booking Error</h2>
          <p>Unable to retrieve booking details. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-success-wrapper">
      <div className="payment-success-box">
        <h2>Booking Confirmation</h2>
        <p>Your payment was successful! ✅</p>

        <div className="section-box">
          <h3>
            <u>Hotel Booking Details</u>
          </h3>
          <p>
            <strong>Hotel:</strong> {hotelName}
          </p>
          <p>
            <strong>Place:</strong> {Place}
          </p>
          <p>
            <strong>Room Type:</strong> {roomType}
          </p>
          <p>
            <strong>Rooms:</strong> {roomCount}
          </p>
          <p>
            <strong>Check-In:</strong>{" "}
            {new Date(checkInDate).toLocaleDateString("en-GB")}
          </p>
          <p>
            <strong>Check-Out:</strong>{" "}
            {new Date(checkOutDate).toLocaleDateString("en-GB")}
          </p>
          <p>
            <strong>Payment ID:</strong> {paymentId}
          </p>
        </div>

        <button onClick={handleDownload} className="download-button">
          Download Ticket
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessHotel;
