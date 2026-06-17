// CabDetailsPage.jsx

import { useLocation, useNavigate } from "react-router-dom";
import "./CabDetailsPage.css";

function CabDetailsIN() {
  const location = useLocation();
  const navigate = useNavigate();
  const cab = location.state?.cab;
  const passengers = location.state?.passengers || 1;

  if (!cab) {
    return <div className="error-message">No cab details available.</div>;
  }

  const handleConfirmBooking = () => {
    navigate("/passengerdetailscabpage", {
      state: {
        cab,
      },
    });
  };

  return (
    <div className="cab-details-page">
      <h2 className="details-title">Cab Details</h2>
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="cab-details-card">
        <div className="cab-summary-card">
          <div className="cab-image">
            <img src={cab.imageurl} alt={cab.cabName} />
            <span className="badge">CNG</span>
          </div>

          <div className="cab-summary-details">
            <div className="cab-header">
              <h3>{cab.cabName}</h3>
              <h5>
                {cab.rating}/5<h9> (163 ratings)</h9>
              </h5>
            </div>

            <div className="cab-tags">
              <span className="tag">{cab.carType}</span>
              <span className="tag">AC</span>
              <span className="tag">{cab.seatsAvailable} seats</span>
            </div>

            <ul className="cab-features">
              <li>
                ✔️ {cab.kmsIncluded || 501} kms included. After that ₹
                {cab.extraRate || 18.0}/km
              </li>
              <li>✔️ Free cancellation until 1 hour before pickup</li>
              <li>⛽ CNG Car</li>
            </ul>

            <p className="cab-price">
              Price: ₹{cab.price} (+{cab.price * 0.12} taxes)
            </p>
          </div>
        </div>

        <p>Images of selected vehicle category:</p>
        <div className="cab-photos-row">
          <img
            src="https://www.motorbeam.com/wp-content/uploads/Maruti_Suzuki_Swift_Review-1200x802.jpg"
            alt="Car Dront"
          />
          <img
            src="https://www.motorbeam.com/wp-content/uploads/Maruti-Swift-Specifications-1200x900.jpg"
            alt="Car 2"
          />
          <img
            src="https://www.financialexpress.com/wp-content/uploads/2016/10/ext-22.jpg?w=470"
            alt="Car 3"
          />
        </div>
        <div className="good-choice">
          <p className="choice-label">Reasons you’ve made a good choice</p>
          <div className="choice-tags">
            <span className="tag">Free waiting upto 45 minutes</span>
            <span className="tag">
              Free cancellation until 1 hour before pickup
            </span>
          </div>
        </div>
        <div className="amenities-section">
          <h3>Amenities in the Car</h3>
          <div className="amenities-list">
            <div className="amenity-item">🧃 Water Bottles</div>
            <div className="amenity-item">📶 Mobile Charging Point</div>
            <div className="amenity-item">📺 Music System</div>
            <div className="amenity-item">🧼 Sanitizer</div>
            <div className="amenity-item">❄️ Air Conditioning</div>
            <div className="amenity-item">🧴 Tissues</div>
          </div>
        </div>

        <div className="Driver">
          <h2>
            <u>Driver & Cab details</u>
          </h2>
          <h4>
            Cab operator will be assigned on booking completion. Cab and driver
            details will be shared up to 30 mins prior to departure.
          </h4>
          <h6>
            Some points to note for CNG vehicles before your travel:
            <p>
              - On longer journeys refill breaks are required which typically
              last 30+ minutes because of fewer stations and longer queues.
            </p>
            <p>- Diesel cabs have stronger ACs as compared to CNG vehicles.</p>
          </h6>
          <div className="Inclusion">
            <h4>☑️ Inclusions (Included in the Price)</h4>
            <h7>- Parking Charges</h7>
            <h7>
              <p>- State Tax</p>
            </h7>
            <h7>
              <p>- Toll Charges(Highway)</p>
            </h7>
            <h7>
              <p>- Driver Allowance</p>
            </h7>
            <h7>- Only One Pickup and Drop</h7>
          </div>

          <div className="info-section">
            <div className="info-card">
              <h3>Cancellation Policy</h3>
              <div className="policy-item">
                <div className="policy-icon green">₹</div>
                <div className="policy-text">
                  <strong>After Booking Confirmed</strong>
                  <p>Free Cancellation</p>
                </div>
              </div>
              <div className="policy-item">
                <div className="policy-icon red">🚗</div>
                <div className="policy-text">
                  <strong>After 5th May 9:00 am</strong>
                  <p>No refund</p>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>Other information</h3>
              <ul className="other-info-list">
                <li>AC will be switched off in hilly areas</li>
                <li>
                  Only one pick-up, one drop & one pit stop for meal is included
                </li>
                <li>
                  The booking will be for cab type HATCHBACK and we do not
                  commit on providing the preferred cab model (Indica, Swift or
                  similar)
                </li>
                <li>
                  Due to traffic or any other unavoidable reason, pickup may be
                  delayed by 30 mins.
                </li>
                <li>
                  Incase of a CNG refill stop the avg turnaround time will be
                  30+ mins due to lesser stations and long queues
                </li>
              </ul>
            </div>
          </div>
        </div>
        <button className="confirm-button" onClick={handleConfirmBooking}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default CabDetailsIN;
