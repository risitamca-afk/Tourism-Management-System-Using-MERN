import React from "react";
import Navbar from "../components/Navbar/Navbar";
import TransportNavbar from "../components/Navbar/TransportNavbar";
import TrainSearchApp from "../components/Transport/TrainSearchApp";

const TrainSearchPage = () => {
  return (
    <div>
      <Navbar />
      <TransportNavbar />
      <TrainSearchApp />
    </div>
  );
};

export default TrainSearchPage;
