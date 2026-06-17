import React from "react";
import "./allpage.css";
import Navbar from "../components/Navbar/Navbar";
import FrontSlider from "../components/FrontSlider/FrontSlider";
import Top10places from "../components/Top10places/Top10places";
import Offers from "../components/Offers/Offers";
import Discover from "../components/Discover/Discover";
import Footer from "../components/Footer/Footer";
import Navbarupdate from "../components/Navbar/Navbarupdate";
import OffersNext from "../components/Offers/OffersNext";
// import { Discoverdata } from "../dataset/Discoverdata";
const Landing = () => {
  return (
    <div className="main_container_Landing">
      <Navbar />
      {/* <Navbarupdate /> */}
      <FrontSlider />
      <Top10places />
      <Offers />
      {/* <Discover data={Discoverdata} /> */}
      <Discover />
      <Footer />
      {/* <OffersNext /> */}
    </div>
  );
};

export default Landing;
