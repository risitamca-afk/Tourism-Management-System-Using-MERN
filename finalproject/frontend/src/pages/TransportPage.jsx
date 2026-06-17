import React from "react";
import FlightBooking from "../components/Booking/FlightBooking";
import Navbar from "../components/Navbar/Navbar";
import TransportNavbar from "../components/Navbar/TransportNavbar";
import FlightSearchApp from "../components/Transport/FlightSearchApp";

const TransportPage = () => {
  return (
    <div>
      <Navbar />
      <TransportNavbar />
      <FlightSearchApp />
    </div>
  );
};

export default TransportPage;
