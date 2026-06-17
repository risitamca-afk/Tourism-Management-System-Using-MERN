import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import "./PassengerDetailsForm.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure flight and form data passed via state
  const { formData, hotel } = location.state || {}; // `flight` contains the selected flight details, including price

  //   const [passengerDetails, setPassengerDetails] = useState(
  //     Array.from({ length: formData.travelers }, () => ({
  //       name: "",
  //       age: "",
  //       gender: "",
  //       mobile: "",
  //     }))
  //   );

  const [errors, setErrors] = useState(
    Array.from({ length: formData.travelers }, () => ({
      name: "",
      age: "",
      gender: "",
      mobile: "",
    }))
  );

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setPassengerDetails((prev) => {
      const updated = [...prev];
      updated[index][name] = value;
      return updated;
    });

    setErrors((prev) => {
      const updated = [...prev];
      updated[index][name] = "";
      return updated;
    });
  };

  const validateField = (index, field, value) => {
    let error = "";
    if (field === "name") {
      if (!value.trim()) error = "Name is required.";
      else if (!/^[A-Za-z ]+$/.test(value))
        error = "Name must contain only alphabets.";
    } else if (field === "age") {
      const age = parseInt(value, 10);
      if (!value.trim()) error = "Age is required.";
      else if (isNaN(age) || age < 1 || age > 120)
        error = "Age must be between 1 and 120.";
    } else if (field === "gender") {
      if (!value) error = "Gender is required.";
    } else if (field === "mobile") {
      if (!value.trim()) error = "Mobile number is required.";
      else if (!/^\d{10}$/.test(value))
        error = "Mobile number must be 10 digits.";
    }
    return error;
  };

  const validateForm = () => {
    const newErrors = passengerDetails.map((passenger, index) => {
      const errorObj = {};
      Object.keys(passenger).forEach((field) => {
        errorObj[field] = validateField(index, field, passenger[field]);
      });
      return errorObj;
    });

    setErrors(newErrors);

    return newErrors.every((err) => Object.values(err).every((msg) => !msg));
  };

  const handlePayment = () => {
    // Razorpay payment configuration
    const options = {
      key: "rzp_test_cItljZJycy70Ly", // Replace with your Razorpay key
      amount: 28960 * 100, // Dynamic price in paise (multiply by 100 for rupees)
      currency: "INR",
      name: "Flight Booking",
      description: `Booking for ${formData.travelers} passengers`,
      image: "https://your-logo-url.com/logo.png", // Replace with your company logo URL
      handler: function (response) {
        // Handle successful payment
        console.log("Payment successful", response);
        navigate("/confirmation", {
          state: {
            passengerDetails,
            flight,
            formData,
            paymentId: response.razorpay_payment_id,
          },
        });
      },
      prefill: {
        name: passengerDetails[0]?.name || "",
        email: "user@example.com", // Replace with user email if available
        contact: passengerDetails[0]?.mobile || "",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Passenger Details Submitted:", passengerDetails);
      handlePayment();
    } else {
      console.log("Validation failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="passenger-details-form">
      <h2>Passenger Details</h2>
      {passengerDetails.map((passenger, index) => (
        <div key={index} className="passenger-form">
          <h3>Passenger {index + 1}</h3>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={passenger.name}
              onChange={(e) => handleChange(index, e)}
              required
            />
            {errors[index]?.name && (
              <p className="error">{errors[index].name}</p>
            )}
          </div>
          <div>
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={passenger.age}
              onChange={(e) => handleChange(index, e)}
              required
            />
            {errors[index]?.age && <p className="error">{errors[index].age}</p>}
          </div>
          <div>
            <label>Gender:</label>
            <select
              name="gender"
              value={passenger.gender}
              onChange={(e) => handleChange(index, e)}
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors[index]?.gender && (
              <p className="error">{errors[index].gender}</p>
            )}
          </div>
          <div>
            <label>Mobile Number:</label>
            <input
              type="tel"
              name="mobile"
              value={passenger.mobile}
              onChange={(e) => handleChange(index, e)}
              pattern="\d{10}"
              required
            />
            {errors[index]?.mobile && (
              <p className="error">{errors[index].mobile}</p>
            )}
          </div>
        </div>
      ))}
      <button type="submit">Submit & Pay</button>
    </form>
  );
};

export default Payment;
