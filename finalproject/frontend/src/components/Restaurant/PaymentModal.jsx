// Components/PaymentModal.js
import React, { useEffect } from "react";

const PaymentModal = ({
  isOpen,
  onClose,
  bookingData,
  onPaymentSuccess,
  amount,
}) => {
  useEffect(() => {
    if (isOpen) loadRazorpayScript();
  }, [isOpen]);

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
      alert("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_cItljZJycy70Ly", // Replace with live key in production
      amount: amount * 100,
      currency: "INR",
      name: "Table Booking",
      description: "Advance payment for table reservation",
      handler: function (response) {
        onPaymentSuccess(response);
      },
      prefill: {
        name: bookingData.username,
        email: "", // Add if needed
        contact: "", // Add if needed
      },
      theme: {
        color: "#2bbdf7",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (!isOpen) return null;

  return (
  <>
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Payment Portal</h2>
        <p>Pay ₹{amount} as advance to confirm your booking.</p>
        <div>
          <button onClick={handlePayment} className="pay-button">
            Pay
          </button>
          <button onClick={onClose} className="close-button">
            Cancel
          </button>
        </div>
      </div>
    </div>

    <style>{`
      .modal-content h2 {
        margin-bottom: 1rem;
        color: #333;
      }

      .modal-content p {
        font-size: 1rem;
        color: #555;
        margin-bottom: 2rem;
      }

      .pay-button {
        background-color: #2bbdf7;
        color: white;
        padding: 10px 30px;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
        margin-bottom: 1rem;
        transition: background-color 0.2s;
      }

      .pay-button:hover {
        background-color: #1999c9;
      }

      .close-button {
        background-color:rgb(236, 132, 132);
        color: white;
        padding: 15px 10px;
        font-size: 0.95rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .close-button:hover {
        background-color:rgb(150, 57, 57);
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `}</style>
  </>
);
};

export default PaymentModal;
