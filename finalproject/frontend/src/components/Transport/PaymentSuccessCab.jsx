// PaymentSuccessCabPage.jsx

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import axios from 'axios';
import './PaymentSuccessPage.css';

const PaymentSuccessCab = () => {
  const location = useLocation();
  const { cab, formData, paymentId } = location.state || {};

  useEffect(() => {
    const saveBooking = async () => {
      try {
        await axios.post('http://localhost:5000/api/cab-bookings', {
          CabId: cab._id,
          cabName: cab.cabName,
          cabNumber: cab.cabNumber,
          carType: cab.carType,
          from: cab.from,
          to: cab.to,
          date: cab.date,
          paymentId: paymentId
        });
      } catch (error) {
        console.error('Failed to save cab booking:', error);
      }
    };

    if (cab && paymentId) {
      saveBooking();
    }
  }, [cab, paymentId]);

  const handleDownload = async () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const qrLink = window.location.origin;
    const qrDataURL = await QRCode.toDataURL(qrLink);

    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277);
    doc.setFontSize(22);
    doc.setTextColor(40, 100, 200);
    doc.text('Cab Booking Ticket', 105, 25, { align: 'center' });
    doc.setDrawColor(0);
    doc.line(10, 30, 200, 30);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Cab Details:', 15, 40);

    doc.setFontSize(12);
    doc.text(`Cab Name: ${cab.cabName}`, 15, 48);
    doc.text(`From: ${cab.from}`, 15, 56);
    doc.text(`To: ${cab.to}`, 15, 64);
    doc.text(`Car Type: ${cab.carType}`, 15, 72);
    doc.text(`Seater: ${cab.seatsAvailable}`, 15, 80);
    doc.text(`Payment ID: ${paymentId}`, 15, 88);

    doc.line(10, 95, 200, 95);
    doc.setFontSize(14);
    doc.text('Passenger & Trip Details:', 15, 103);

    doc.setFontSize(12);
    doc.text(`Name: ${formData.name}`, 20, 111);
    doc.text(`Mobile: ${formData.mobileNumber}`, 20, 119);
    doc.text(`Pickup Address: ${formData.pickupAddress}`, 20, 127);
    doc.text(`Dropoff Address: ${formData.dropoffAddress}`, 20, 135);
    doc.text(`Pickup Time: ${cab.pickupTime || '11:00'}`, 20, 143);

    const tripSectionEnd = 143;
    const totalFare = (cab.price * 1.12).toFixed(2);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);
    doc.text(`Total Fare: ₹${totalFare}`, 15, tripSectionEnd + 15);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Scan QR to Book Again:', 15, tripSectionEnd + 35);
    doc.addImage(qrDataURL, 'PNG', 15, tripSectionEnd + 40, 50, 50);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Thank you for choosing our Cab Service! Have a great trip!', 105, 290, { align: 'center' });

    doc.save('cab_ticket.pdf');
  };

  return (
    <div className="payment-success-wrapper">
      <div className="payment-success-box">
        <h2 className="text-3xl font-semibold text-green-600 mb-6">☑️ Payment Successful</h2>
        <p className="text-lg mb-4">Your cab has been booked successfully!</p>
        <p className="text-md mb-6">Payment ID: <span className="font-mono">{paymentId}</span></p>

        <div className="border p-6 rounded-lg shadow-md mb-6 text-left">
          <p className="text-sm"><strong>Cab:</strong> {cab.cabName}</p>
          <p className="text-sm"><strong>From:</strong> {cab.from} ➔ <strong>To:</strong> {cab.to}</p>
          <p className="text-sm"><strong>Car Type:</strong> {cab.carType}</p>
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

export default PaymentSuccessCab;
