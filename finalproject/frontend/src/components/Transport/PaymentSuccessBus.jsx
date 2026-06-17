import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import './PaymentSuccessPage.css';

const PaymentSuccessBus = () => {
  const location = useLocation();
  const { bus, passengers, passengerDetails, paymentId, selectedSeats } = location.state || {};

  useEffect(() => {
    const saveBusBooking = async () => {
      if (!bus || !paymentId) return;

      try {
        await axios.post('http://localhost:5000/api/bus-bookings', {
          BusId: bus._id,
          busName: bus.busName,
          busNumber: bus.busNumber,
          from: bus.from,
          to: bus.to,
          departureTime: bus.departureTime,
          arrivalTime: bus.arrivalTime,
          date: bus.date,
          paymentId,
        });
      } catch (error) {
        console.error('Failed to save bus booking:', error);
      }
    };

    saveBusBooking();
  }, [bus, paymentId]);

  const handleDownload = async () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const qrLink = window.location.origin;
    const qrDataURL = await QRCode.toDataURL(qrLink);

    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277);

    doc.setFontSize(22);
    doc.setTextColor(40, 100, 200);
    doc.text('Bus Ticket', 105, 25, { align: 'center' });

    doc.setDrawColor(0);
    doc.line(10, 30, 200, 30);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Bus Details:', 15, 40);

    doc.setFontSize(12);
    doc.text(`Bus: ${bus.busName}`, 15, 48);
    doc.text(`From: ${bus.from}`, 15, 56);
    doc.text(`To: ${bus.to}`, 15, 64);
    doc.text(`Date: ${bus.date}`, 15, 72);
    doc.text(`Departure: ${bus.departureTime}`, 15, 80);
    doc.text(`Arrival: ${bus.arrivalTime}`, 15, 88);
    doc.text(`Payment ID: ${paymentId}`, 15, 96);

    doc.line(10, 102, 200, 102);

    doc.setFontSize(14);
    doc.text('Passenger Details:', 20, 110);

    doc.setFontSize(12);
    passengerDetails.forEach((p, i) => {
      doc.text(`${i + 1}. ${p.name}, Age: ${p.age}, Gender: ${p.gender}, Seat No.: ${selectedSeats[i]}`, 20, 118 + i * 8);
    });

    const passengerSectionEnd = 118 + passengerDetails.length * 8;

    const totalFare = (bus.price * passengers * 1.12).toFixed(2);
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);
    doc.text(`Total Fare: ₹${totalFare}`, 15, passengerSectionEnd + 10);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Scan QR to Book Again:', 15, passengerSectionEnd + 30);

    doc.addImage(qrDataURL, 'PNG', 15, passengerSectionEnd + 35, 50, 50);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Thank you for booking with us! Have a safe journey!', 105, 290, { align: 'center' });

    doc.save('bus_ticket.pdf');
  };

  return (
    <div className="payment-success-wrapper">
      <div className="payment-success-box">
        <h2 className="text-3xl font-semibold text-green-600 mb-6">☑️ Payment Successful</h2>
        <p className="text-lg mb-4">Your bus ticket has been booked successfully!</p>
        <p className="text-md mb-6">Payment ID: <span className="font-mono">{paymentId}</span></p>

        <div className="border p-6 rounded-lg shadow-md mb-6 text-left">
          <p className="text-sm"><strong>Bus:</strong> {bus.busName}</p>
          <p className="text-sm"><strong>From:</strong> {bus.from} <strong>To:</strong> {bus.to}</p>
          <p className="text-sm"><strong>Date:</strong> {bus.date}</p>
          <p className="text-sm"><strong>Departure:</strong> {bus.departureTime} <strong>Arrival:</strong> {bus.arrivalTime}</p>
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

export default PaymentSuccessBus;
