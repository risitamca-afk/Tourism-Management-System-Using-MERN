import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./FlightSeatSelect.css";

const FlightSeatSelect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, passengers } = location.state || {}; // Get flight and passengers from previous page state

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const seatRows = ["A", "B", "C", "D", "E", "F"]; // Rows for seats
  const seatNumbers = Array.from({ length: 10 }, (_, i) => i + 1); // Seat numbers 1 to 10

  // Fetch booked seats from the backend when the component mounts
  const fetchBookedSeats = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/flight-seats/${flight._id}`
      );
      setBookedSeats(res.data || []); // Set booked seats from response
    } catch (err) {
      console.error("Error fetching booked seats:", err);
    }
  };

  useEffect(() => {
    if (flight && flight._id) {
      fetchBookedSeats();
    }
  }, [flight]);

  // Handle seat selection
  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return; // Don't allow selection of booked seats
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat) // Deselect seat if already selected
        : prev.length < passengers
        ? [...prev, seat] // Select seat if not exceeding passenger limit
        : prev
    );
  };

  // Check if a seat can be selected
  const isSeatSelectable = (seat) =>
    !bookedSeats.includes(seat) &&
    (selectedSeats.includes(seat) || selectedSeats.length < passengers);

  // Handle the booking process
  const handleNext = async () => {
    if (selectedSeats.length !== passengers) {
      alert(`Please select exactly ${passengers} seat(s).`);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/flight-seats/book", {
        flightId: flight._id,
        selectedSeats,
      });

      // Navigate to the booking confirmation page
      navigate("/flightbookingpage", {
        state: { flight, selectedSeats, passengers },
      });
    } catch (error) {
      console.error("Booking error:", error);
      if (error.response?.status === 400) {
        alert(
          error.response.data.message ||
            "Some seats are already booked. Try again."
        );
        fetchBookedSeats(); // Refresh booked seats
        setSelectedSeats([]); // Clear selected seats
      } else {
        alert("Booking failed. Try again later.");
      }
    }
  };

  return (
    <div className="flight-seat-selection my-10 mx-auto">
      <p>Please Select exactly {passengers} seat(s)</p>

      <div className="seat-and-fare-wrapper">
        {/* Seat Grid */}
        <div className="seat-section">
          <div className="flight-seat-grid">
            {/* Group A-C */}
            <div className="seat-column-group">
              {["A", "B", "C"].map((row) => (
                <div className="seat-column" key={row}>
                  {seatNumbers.map((num) => {
                    const seat = `${row}${num}`;
                    const isBooked = bookedSeats.includes(seat);
                    const isSelected = selectedSeats.includes(seat);
                    return (
                      <button
                        key={seat}
                        className={`seat ${isSelected ? "selected" : ""} ${
                          isBooked ? "booked" : ""
                        }`}
                        disabled={!isSeatSelectable(seat)}
                        onClick={() => handleSeatClick(seat)}
                      >
                        {isBooked ? "X" : seat}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Gap between A-C and D-F */}
            <div className="gap-column" />

            {/* Group D-F */}
            <div className="seat-column-group">
              {["D", "E", "F"].map((row) => (
                <div className="seat-column" key={row}>
                  {seatNumbers.map((num) => {
                    const seat = `${row}${num}`;
                    const isBooked = bookedSeats.includes(seat);
                    const isSelected = selectedSeats.includes(seat);
                    return (
                      <button
                        key={seat}
                        className={`seat ${isSelected ? "selected" : ""} ${
                          isBooked ? "booked" : ""
                        }`}
                        disabled={!isSeatSelectable(seat)}
                        onClick={() => handleSeatClick(seat)}
                      >
                        {isBooked ? "X" : seat}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <button className="proceed-btn" onClick={handleNext}>
            Proceed to Booking
          </button>
        </div>

        {/* Fare Summary & Promo Section */}
        <div className="fare-summary-section">
          <div className="fare-summary-box">
            <h3>Fare Summary</h3>
            <div className="fare-item">
              <span>Base Fare</span>
              <span>₹ {flight.price}</span>
            </div>
            <div className="fare-item">
              <span>Taxes and Surcharges</span>
              <span>₹ {flight.price * 0.12}</span>
            </div>
            <hr />
            <div className="fare-total">
              <strong>Total Amount</strong>
              <strong>₹ {flight.price + flight.price * 0.12}</strong>
            </div>
          </div>
          <div className="promo-box">
            <h4>PROMO CODES 🎁</h4>
            <input type="text" placeholder="Enter promo code here" />
            <a href="#" className="view-coupons">
              VIEW ALL COUPONS
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSeatSelect;
