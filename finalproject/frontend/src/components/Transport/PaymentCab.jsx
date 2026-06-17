// PaymentCabPage.jsx

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentCab = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cab, passengers, passengerDetails, formData } = location.state || {};
  const totalAmount = (cab.price * 1.12).toFixed(2); // assuming 5% tax for cabs

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
      key: "rzp_test_cItljZJycy70Ly", // Replace with your actual Razorpay API key
      amount: totalAmount * 100, // Razorpay accepts amount in paisa
      currency: "INR",
      name: "Cab Booking Service",
      description: "Booking a cab through Razorpay",
      handler: function (response) {
        navigate("/paymentsuccesscabpage", {
          state: {
            cab,
            passengers,
            formData,
            paymentId: response.razorpay_payment_id,
          },
        });
      },
      prefill: {
        name: passengerDetails?.name || "",
        email: "",
        contact: passengerDetails?.mobileNumber || "",
      },
      theme: {
        color: "#0D6EFD",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="payment-page">
      <h2>Cab Payment Page</h2>
      <button onClick={handlePayment} className="pay-button">
        Pay ₹{totalAmount} with Razorpay
      </button>
    </div>
  );
};

export default PaymentCab;
