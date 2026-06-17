import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Hotelnext.css";
import navlogo from "../../assets/hotel/logobookmyspot.png";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from 'react-router-dom';
const Hotelnext = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user} = useAuthStore();
  const { checkInDate, checkOutDate, rooms, selectedHotel } =
    location.state || {};

  const [formFields, setFormFields] = useState({
    adults: 1,
    rooms: rooms || 1,
    checkInDate: checkInDate || "",
    checkOutDate: checkOutDate || "",
    phno: "",
    name:user.name,
    email:user.email,
  });

  const [totalPrice, setTotalPrice] = useState(
    selectedHotel?.price || 0 // Base price passed from the previous page
  );

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end - start;
    return timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1 : 0;
  };

  useEffect(() => {
    const pricePerRoom = selectedHotel?.price || 0; // Assume the price in `selectedHotel` is per room
    const totalDays = calculateDays(
      formFields.checkInDate,
      formFields.checkOutDate
    );
    setTotalPrice(formFields.rooms * pricePerRoom * (totalDays || 1));
  }, [
    formFields.rooms,
    formFields.checkInDate,
    formFields.checkOutDate,
    selectedHotel,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handlePayment = () => {
    
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please check your connection.");
      return;
    }

    const options = {
      key: "rzp_test_cItljZJycy70Ly", // Replace with your Razorpay Key ID
      amount: totalPrice * 100, // Convert to the smallest currency unit (paise for INR)
      currency: "INR",
      name: "BookYourSpot",
      description: `Booking at ${selectedHotel?.title}`,
      image: navlogo, // Optional, replace with your company logo URL
      handler: function (response) {
        // Redirect to the Reciept page with booking data
        navigate("/HotelReciept", {
          state: {
            checkInDate: formFields.checkInDate,
            checkOutDate: formFields.checkOutDate,
            rooms: formFields.rooms,
            selectedHotel,
            totalPrice,
            paymentId: response.razorpay_payment_id, // Pass payment ID
            phno: formFields.phno,
          },
        });
      },
      prefill: {
        name:formFields.name, // Replace with user's name
        email:formFields.email, // Replace with user's email
        contact: formFields.phno, // Replace with user's phone
      },
      notes: {
        address: "Hotel booking address note",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      alert(`Payment failed! Error: ${response.error.description}`);
    });

    rzp.open();
  };

  return (
    <div className="container-center">
      <div className="container-hotelnext-main">
      <div className="container-hotelnext">
        <div className="left-section">
          {selectedHotel ? (
            <>
              <img
                src={selectedHotel.imgSrc}
                alt="imagehotel"
                className="imagehotel"
              />
              <h1 className="hotelheadingpayment">Welcome to {selectedHotel.title}</h1>
              <p>Location: {selectedHotel.destination}</p>
            </>
          ) : (
            <p>No hotel selected.</p>
          )}
        </div>
        <div className="right-section">
          <h1>Book Your Stay</h1>
          <div className="booking-form1">
            {selectedHotel ? (
              <div>
                <label>Number of Adults</label>
                <input
                  type="number"
                  name="adults"
                  value={formFields.adults}
                  onChange={handleChange}
                  className="number-input"
                  min="1"
                  max="10" 
                />

                <label>Number of Rooms</label>
                <input
                  type="number"
                  name="rooms"
                  value={formFields.rooms}
                  onChange={handleChange}
                  className="number-input"
                  min="1"
                />

                <label>Check In Date</label>
                <input
                  type="date"
                  name="checkInDate"
                  value={formFields.checkInDate}
                  onChange={handleChange}
                  className="date-input"
                />

                <label>Check Out Date</label>
                <input
                  type="date"
                  name="checkOutDate"
                  value={formFields.checkOutDate}
                  onChange={handleChange}
                  className="date-input"
                />

                <label>Phone Number</label>
                <input
                  type="text"
                  name="phno"
                  value={formFields.phno}
                  onChange={handleChange}
                  className="number-input"
                />

                <p >
                  Total Price: <span className="totalpricecolor"> ₹{totalPrice}</span>
                </p>
              </div>
            ) : (
              <p>No hotel selected.</p>
            )}
            <button onClick={handlePayment}>Pay now</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
   
};

export default Hotelnext;
