import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Hotel.css"; // Import the external CSS file
import { hotelsData1 } from "../../dataset/hoteldata";

const Hotel = () => {
  const [searchFields, setSearchFields] = useState({
    destination: "",
    checkInDate: "",
    checkOutDate: "",
    rooms: 1,
  });

  const navigate = useNavigate();
  const navigateToPage = (url) => {
    navigate(url);
  };

  // Extended dataset with additional entries
  const hotelsData = hotelsData1;

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset handler to clear search fields
  const handleReset = () => {
    setSearchFields({
      destination: "",
      checkInDate: "",
      checkOutDate: "",
      rooms: 1,
      price: "",
    });
  };

  // Filter hotels based on search criteria
  const filteredhotels = hotelsData.filter(
    (hotel) =>
      (searchFields.destination === "" ||
        hotel.destination
          .toLowerCase()
          .includes(searchFields.destination.toLowerCase())) &&
      (searchFields.checkInDate === "" ||
        searchFields.checkOutDate === "" ||
        (new Date(searchFields.checkInDate) >= new Date(hotel.checkInDate) &&
          new Date(searchFields.checkOutDate) <=
            new Date(hotel.checkOutDate))) &&
      hotel.availableRooms >= searchFields.rooms
  );

  return (
    <div className="hotel-search-container">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          name="destination"
          placeholder="Where are you going?"
          value={searchFields.destination}
          onChange={handleChange}
          className="search-input"
        />
        <input
          type="date"
          name="checkInDate"
          value={searchFields.checkInDate}
          onChange={handleChange}
          className="date-input"
        />
        <input
          type="date"
          name="checkOutDate"
          value={searchFields.checkOutDate}
          onChange={handleChange}
          className="date-input"
        />
        <select
          name="rooms"
          value={searchFields.rooms}
          onChange={handleChange}
          className="dropdown"
        >
          {[...Array(10).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1} Room{num > 0 && "s"}
            </option>
          ))}
        </select>
        {/* Reset Button */}
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>

      {/* Offers Cards */}
      <div className="hotels-list">
        {filteredhotels.length > 0 ? (
          filteredhotels.map((hotel, index) => (
            <div key={index} className="hotels-card">
              <div className="hotels-card-image">
                <img src={hotel.imgSrc} alt={hotel.imgSrc} />
              </div>
              <div className="hotels-card-content">
                <h2 className="hotels-card-title">{hotel.title}</h2>
                <p className="hotels-card-description">{hotel.description}</p>
                <p className="hotels-card-destination">
                  Destination: {hotel.destination}
                </p>
                {/* <p className="hotels-card-dates">
                  {hotel.checkInDate} to {hotel.checkOutDate}
                </p>
                <p className="hotels-card-rooms">
                  Available Rooms: {hotel.availableRooms}
                </p> */}
                <p className="price">{hotel.price}/-</p>
                <button
                  className="hotels-book-now"
                  onClick={() =>
                    navigate("/Hotelnext", {
                      state: { ...searchFields, selectedHotel: hotel },
                    })
                  }
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No hotels match your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Hotel;


