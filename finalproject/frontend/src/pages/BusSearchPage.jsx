import React from "react";
import Navbar from "../components/Navbar/Navbar";
import TransportNavbar from "../components/Navbar/TransportNavbar";
import BusSearchApp from "../components/Transport/BusSearchApp";

const BusSearchPage = () => {
  return (
    <div>
      <Navbar />
      <TransportNavbar />
      <BusSearchApp />
    </div>
  );
};

export default BusSearchPage;
