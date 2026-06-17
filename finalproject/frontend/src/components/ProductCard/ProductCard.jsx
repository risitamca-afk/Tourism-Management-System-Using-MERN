import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useAuthStore } from "../../store/auth.store";

const ProductCard = ({ product }) => {
  if (!product || !Array.isArray(product.roomTypes)) {
    console.warn("Invalid hotel data:", product);
    return <p>No room data available for this hotel 123.</p>;
  }
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Handle button click function for btn click
  const handleButtonClickSignin = () => {
    if (isAuthenticated) {
      navigate("/Hotelnext", {
        state: { product },
      });
    } else {
      navigate("/login");
    }
  };

  // Try normal first, fall back to standard
  const room =
    product.roomTypes.find(
      (room) => room.type?.trim().toLowerCase() === "normal"
    ) ||
    product.roomTypes.find(
      (room) => room.type?.trim().toLowerCase() === "standard"
    ) ||
    product.roomTypes.find(
      (room) => room.type?.trim().toLowerCase() === "deluxe"
    );

  if (!room) {
    console.warn("No usable room type found for hotel:", product);
    return <p>No room data available for this hotel.</p>;
  }

  return (
    <div className="hotels-card">
      <div className="hotels-card-image">
        <div className="hotels-card-image-inside">
          <img src={product.img} alt={product.title} />
        </div>
      </div>

      <div className="hotels-card-content">
        <div className="hotel-card-main">
          <h1 className="hotels-card-title">{product.title}</h1>
          <p className="hotels-card-destination">{product.destination}</p>
          <p className="hotels-card-description">{product.description}</p>

          <div className="special-features-hotel">
            {room.specialFeatures.map((feature, index) => (
              <p key={index}>
                <FontAwesomeIcon icon={faCheck} /> &nbsp;{feature}
              </p>
            ))}
          </div>
        </div>

        <div className="hotel-card-sub">
          <div className="rating-hotel">
            <h3>{product.quality}</h3>
            <h2>{product.rating}</h2>
          </div>

          <div className="hotelmrp">
            <h2 className="price">₹{room.price}/-</h2>
            <p className="taxhotel">+ ₹{room.tax} taxes & fees</p>
            <p>Per Night</p>
          </div>

          <button className="hotels-book-now" onClick={handleButtonClickSignin}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
