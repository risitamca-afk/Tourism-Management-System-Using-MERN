import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import axios from "axios";
import "./PaymentSuccessPage.css";

const PaymentSuccessTrain = () => {
  const location = useLocation();
  const { train, passengers, passengerDetails, paymentId } =
    location.state || {};

  // ✅ Save booking to MongoDB when page loads
  useEffect(() => {
    const postTrainBooking = async () => {
      try {
        await axios.post("http://localhost:5000/api/train-booking", {
          trainId: train._id,
          trainName: train.trainName,
          trainNumber: train.trainNumber,
          from: train.from,
          to: train.to,
          departureTime: train.departureTime,
          arrivalTime: train.arrivalTime,
          date: train.date,
          paymentId: paymentId,
        });
        console.log("✅ Train booking saved to DB");
      } catch (err) {
        console.error("❌ Error saving train booking:", err);
      }
    };

    if (train && paymentId) {
      postTrainBooking();
    }
  }, [train, paymentId]);

  // ✅ Download PDF Ticket
  const handleDownload = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const qrLink = window.location.origin;
    const qrDataURL = await QRCode.toDataURL(qrLink);

    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277);

    doc.setFontSize(22);
    doc.setTextColor(40, 100, 200);
    doc.text("Train Ticket", 105, 25, { align: "center" });

    doc.setDrawColor(0);
    doc.line(10, 30, 200, 30);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Train Details:", 15, 40);

    doc.setFontSize(12);
    doc.text(`Train: ${train.trainNumber} - ${train.trainName}`, 15, 48);
    doc.text(`From: ${train.from}`, 15, 56);
    doc.text(`To: ${train.to}`, 15, 64);
    doc.text(`Date: ${train.date}`, 15, 72);
    doc.text(`Departure: ${train.departureTime}`, 15, 80);
    doc.text(`Arrival: ${train.arrivalTime}`, 15, 88);
    doc.text(`Payment ID: ${paymentId}`, 15, 96);

    doc.line(10, 102, 200, 102);

    doc.setFontSize(14);
    doc.text("Passenger Details:", 15, 110);

    doc.setFontSize(12);
    passengerDetails.forEach((p, i) => {
      const seat = `T${i + 5}`;
      doc.text(
        `${i + 1}. ${p.name}, Age: ${p.age}, Gender: ${
          p.gender
        }, Seat: ${seat}, Berth: ${p.berthPreference}, Meal: ${
          p.mealPreference
        }`,
        20,
        118 + i * 8
      );
    });

    const passengerSectionEnd = 118 + passengerDetails.length * 8;
    const totalFare = (train.price * passengers * 1.12).toFixed(2);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);
    doc.text(`Total Fare: ₹${totalFare}`, 15, passengerSectionEnd + 10);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Scan QR to Book Again:", 15, passengerSectionEnd + 30);

    doc.addImage(qrDataURL, "PNG", 15, passengerSectionEnd + 35, 50, 50);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for booking with us! Have a safe journey!", 105, 290, {
      align: "center",
    });

    doc.save("train_ticket.pdf");
  };

  return (
    <div className="payment-success-wrapper">
      <div className="payment-success-box">
        <h2 className="text-3xl font-semibold text-green-600 mb-6">
          ☑️ Payment Successful
        </h2>
        <p className="text-lg mb-4">
          Your train ticket has been booked successfully!
        </p>
        <p className="text-md mb-6">
          Payment ID: <span className="font-mono">{paymentId}</span>
        </p>

        <div className="border p-6 rounded-lg shadow-md mb-6 text-left">
          <p className="text-sm">
            <strong>Train:</strong> {train.trainNumber} - {train.trainName}
          </p>
          <p className="text-sm">
            <strong>From:</strong> {train.from} <strong>To:</strong> {train.to}
          </p>
          <p className="text-sm">
            <strong>Date:</strong> {train.date}
          </p>
          <p className="text-sm">
            <strong>Departure:</strong> {train.departureTime}{" "}
            <strong>Arrival:</strong> {train.arrivalTime}
          </p>
        </div>

        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Download Ticket (PDF with QR)
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessTrain;
