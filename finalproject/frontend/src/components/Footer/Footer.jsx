import React from "react";
import "./Footer.css";
import footlogo from "../../assets/hotel/logobookmyspot.png";
const Footer = () => {
  return (
    <div className="mainfooter">
      <div className="footercontent">
        <div className="footerlogo">
          <div className="footlogo">
            <img src={footlogo} alt="navbarlogo" className="footlogo" />
          </div>
        </div>
        <div className="whybookyourspot">
          <h1>
            <u>Why BookYourSpot?</u>
          </h1>
          <div className="byscontent">
            <p>
              Established in 2024, BookYourSpot has since positioned itself as
              one of the leading companies, providing great offers, competitive
              airfares, exclusive discounts, and a seamless online booking
              experience to many of its customers. The experience of booking
              your flight tickets, hotel stay, and holiday package through our
              desktop site
            </p>
          </div>
        </div>
        <div className="ourproducts">
          <h1>
            <u>Our Products</u>
          </h1>
          <div className="opcontent">
            <p>Domestic Hotels</p>
            <p>Domestic Flights</p>
            <p>International Hotels</p>
            <p>Multi-City Flights</p>
            <p>Bus Booking</p>
            <p>Train Booking</p>
            <p>Gift</p>
          </div>
        </div>
        <div className="aboutus">
          <h1>
            <u>About Us</u>
          </h1>
          <div className="opcontent">
            <p>About us</p>
            <p>Terms of Services</p>
            <p>Terms of condition</p>
            <p>User Agreement</p>
            <p>Careers</p>
            <p>Privacy</p>
          </div>
        </div>
      </div>
      <hr className="hline"/>
    </div>
  );
};

export default Footer;
