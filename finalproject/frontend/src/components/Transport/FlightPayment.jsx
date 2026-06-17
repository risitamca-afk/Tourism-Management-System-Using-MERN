import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import navlogo from "../../assets/hotel/logobookmyspot.png";
const FlightPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, passengers, passengerDetails, selectedSeats } =
    location.state || {};
  const totalAmount = (flight.price * passengers * 1.12).toFixed(2);

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert(
        "Failed to load Razorpay SDK. Please check your internet connection."
      );
      return;
    }

    const options = {
      key: "rzp_test_cItljZJycy70Ly", // Replace with your real Razorpay key
      amount: totalAmount * 100,
      currency: "INR",
      image: navlogo,
      name: "BookYourSpot",
      description: "Booking flight ticket through Razorpay",
      handler: function (response) {
        navigate("/flightpaymentsuccesspage", {
          state: {
            flight,
            passengers,
            selectedSeats,
            passengerDetails,
            paymentId: response.razorpay_payment_id,
          },
        });
      },
      prefill: {
        name: passengerDetails[0]?.name || "",
        email: "",
        contact: passengerDetails[0]?.phone || "",
      },
      theme: {
        color: "#1A73E8",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Payment Page
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Total Amount:{" "}
          <span className="font-bold text-gray-800">₹{totalAmount}</span>
        </p>
        <button
          onClick={handlePayment}
          className="bg-blue-600 hover:bg-white hover:text-blue-600 border border-blue-600 text-white font-medium py-2 px-6 rounded transition duration-300"
        >
          Pay ₹{totalAmount} with Razorpay
        </button>
      </div>
    </div>
  );
};

export default FlightPayment;
