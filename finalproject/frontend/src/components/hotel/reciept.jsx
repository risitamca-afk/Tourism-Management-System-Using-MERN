// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// // import "./ConfirmationPage.css";

// const Reciept = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Extract the state passed from the PassengerDetailsForm
//   const { passengerDetails, flight, formData, paymentId } = location.state || {};

//   if (!passengerDetails || !flight || !paymentId) {
//     return (
//       <div className="confirmation-page">
//         <h2>Invalid Access</h2>
//         <p>It seems you have landed on this page incorrectly.</p>
//         <button onClick={() => navigate("/")}>Go to Home</button>
//       </div>
//     );
//   }

//   return (
//     <div className="confirmation-page">
//       <h2>Booking Confirmation</h2>
//       <p>Thank you for booking with us! Your payment was successful.</p>
//       <div className="booking-summary">
//         <h3>Booking Details</h3>
//         <p><strong>Flight:</strong> {flight.airline}</p>
//         <p><strong>From:</strong> {flight.departure}</p>
//         <p><strong>To:</strong> {flight.arrival}</p>
//         <p><strong>Price:</strong> {flight.price}</p>
//         <p><strong>Payment ID:</strong> {paymentId}</p>
//       </div>

//       <div className="passenger-details">
//         <h3>Passenger Details</h3>
//         {passengerDetails.map((passenger, index) => (
//           <div key={index} className="passenger-card">
//             <h4>Passenger {index + 1}</h4>
//             <p><strong>Name:</strong> {passenger.name}</p>
//             <p><strong>Age:</strong> {passenger.age}</p>
//             <p><strong>Gender:</strong> {passenger.gender}</p>
//             <p><strong>Mobile:</strong> {passenger.mobile}</p>
//           </div>
//         ))}
//       </div>

//       <button className="home-button" onClick={() => navigate("/")}>
//         Go to Home
//       </button>
//     </div>
//   );
// };

// export default Reciept;
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./receipt.css";
const Reciept = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the state passed from Hotelnext
  const {
    checkInDate,
    checkOutDate,
    rooms,
    selectedHotel,
    totalPrice,
    paymentId,
    phno,
  } = location.state || {};

  if (!selectedHotel || !paymentId) {
    return (
      <div className="confirmation-page">
        <h2>Invalid Access</h2>
        <p>It seems you have landed on this page incorrectly.</p>
        <button onClick={() => navigate("/landing")}>Go to Home</button>
      </div>
    );
  }

  return (
    <div className="confirmation-page1">

      
      <div className="hotelnamereceipt1">
          <p className="p1">{selectedHotel.title}</p>
          <p className="p2">{selectedHotel.destination}</p>
        </div>
      <div className="booking-summary hotelnamereceipt2">
      <h2><u>Booking Confirmation</u></h2>      
        <p><span className="spaceing1"><strong >Check-In Date:</strong> </span>{checkInDate}</p>
        <p><span className="spaceing2"><strong >Check-Out Date:</strong> </span>{checkOutDate}</p>
        <p><span className="spaceing3"><strong >Number of Rooms:</strong></span> {rooms}</p>
        <p><span className="spaceing4"><strong >Total Price:</strong></span> ₹{totalPrice}</p>
        <p><span className="spaceing5"><strong >Payment ID:</strong></span> {paymentId}</p>
        <p><span className="spaceing6"><strong >Phone Number:</strong></span> {phno}</p>
      </div>
      
      <p>Thank you for booking with us! Your payment was successful.</p>

      <button className="home-button1" onClick={() => navigate("/landing")}>
        Go to Home
      </button>
    </div>
  );
};

export default Reciept;
