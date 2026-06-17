import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import axios from "axios";
import "./PaymentSuccessPage.css";
import { useAuthStore } from "../../store/auth.store.js";

const FlightPaymentSuccess = () => {
  const { user } = useAuthStore();
  const location = useLocation();
  const { flight, passengers, passengerDetails, paymentId, selectedSeats } =
    location.state || {};

  const bookingSavedRef = useRef(false);

  useEffect(() => {
    const saveFlightBooking = async () => {
      if (!flight || !paymentId || bookingSavedRef.current) return;
      try {
        await axios.post("http://localhost:5000/api/flight-bookings", {
          flightId: flight._id,
          airline: flight.airline,
          flightNumber: flight.flightNumber,
          from: flight.from,
          to: flight.to,
          departureTime: flight.departureTime,
          arrivalTime: flight.arrivalTime,
          date: flight.date,
          bookedSeats: selectedSeats,
          paymentId: paymentId,
          username: user?.name || "guest",
        });
        bookingSavedRef.current = true;
        console.log("Flight booking saved to database");
      } catch (error) {
        console.error("Error saving flight booking:", error);
      }
    };

    saveFlightBooking();
  }, [flight, paymentId]);
  const handleDownload = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const qrLink = window.location.origin;
    const qrDataURL = await QRCode.toDataURL(qrLink);

    // Draw Ticket Border
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277);

    // Header
    doc.setFontSize(22);
    doc.setTextColor(40, 100, 200);
    doc.text("Flight Ticket", 105, 25, { align: "center" });
    doc.setDrawColor(0);
    doc.line(10, 30, 200, 30);

    // Flight Information
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Flight Details:", 15, 40);

    doc.setFontSize(12);
    doc.text(`Flight: ${flight.flightNumber} - ${flight.airline}`, 15, 48);
    doc.text(`From: ${flight.from}`, 15, 56);
    doc.text(`To: ${flight.to}`, 15, 64);
    doc.text(
      `Date: ${new Date(flight.date).toLocaleDateString("en-GB")}`,
      15,
      72
    );
    doc.text(`Departure: ${flight.departureTime}`, 15, 80);
    doc.text(`Arrival: ${flight.arrivalTime}`, 15, 88);
    doc.text(`Payment ID: ${paymentId}`, 15, 96);

    doc.line(10, 102, 200, 102);

    // Passenger Information
    doc.setFontSize(14);
    doc.text("Passenger Details:", 15, 110);

    doc.setFontSize(12);
    passengerDetails.forEach((p, i) => {
      doc.text(
        `${i + 1}. ${p.name}, Age: ${p.age}, Gender: ${p.gender}, Seat No.: ${
          selectedSeats[i]
        }, Meal: ${p.mealPreference}`,
        20,
        118 + i * 8
      );
    });

    const passengerSectionEnd = 118 + passengerDetails.length * 8;

    // Total Fare
    const totalFare = (flight.price * passengers * 1.12).toFixed(2);
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);
    doc.text(`Total Fare: ₹${totalFare}`, 15, passengerSectionEnd + 10);

    // QR Code
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Scan QR to Book Again:", 15, passengerSectionEnd + 30);
    doc.addImage(qrDataURL, "PNG", 15, passengerSectionEnd + 35, 50, 50);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for booking with us! Safe Journey!", 105, 290, {
      align: "center",
    });

    doc.save("flight_ticket.pdf");
  };

  if (!flight || !paymentId) {
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
            <u>Booking Details</u>
          </h3>
          <p>
            <strong>Flight:</strong> {flight.airline} {flight.flightNumber}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(flight.date).toLocaleDateString("en-GB")}
          </p>
          <p>
            <strong>From:</strong> {flight.departureTime} ({flight.from})
          </p>
          <p>
            <strong>To:</strong> {flight.arrivalTime} ({flight.to})
          </p>
          <p>
            <strong>Price:</strong> ₹{flight.price}
          </p>
          <p>
            <strong>Payment ID:</strong> {paymentId}
          </p>
        </div>

        <div className="section-box">
          <h3>
            <u>Passenger Details</u>
          </h3>
          {passengerDetails.map((p, i) => (
            <div key={i} className="passenger-entry">
              <p className="text-blue-700">
                <strong>Passenger {i + 1}</strong>
              </p>
              <p>
                <strong>Name:</strong> {p.name}
              </p>
              <p>
                <strong>Age:</strong> {p.age}
              </p>
              <p>
                <strong>Gender:</strong> {p.gender}
              </p>
              <p>
                <strong>Mobile:</strong> {p.phone}
              </p>
            </div>
          ))}
        </div>

        <button onClick={handleDownload} className="download-button">
          Download Ticket
        </button>
      </div>
    </div>
  );
};

export default FlightPaymentSuccess;
