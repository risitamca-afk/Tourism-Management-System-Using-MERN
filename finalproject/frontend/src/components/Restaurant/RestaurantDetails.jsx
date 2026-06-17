import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
import ReviewModal from "./ReviewModal";
import BookingModal from "./BookingPage";
import PaymentModal from "./PaymentModal";
import "../Restaurant/RestaurantPage.css";
import "./RestaurantDetails.css";
import "./Menu.css";

const RestaurantDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");
  const [reviews, setReviews] = useState([]);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    username: "",
    people: "",
    date: "",
    time: "",
  });

  const handlePaymentSuccess = (response) => {
    setPaymentModalOpen(false);
    navigate("/restaurantbookingconfirmationpage", { state: { bookingData } });
  };

  const isBookingDisabled =
    !bookingData.username ||
    !bookingData.people ||
    !bookingData.date ||
    !bookingData.time;

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const data = location.state?.restaurant;
    if (data) {
      setRestaurant(data);
      setReviews(data.reviews || []);
    } else {
      navigate("/restaurantpage"); // fallback if user loads the route directly
    }
  }, [location, navigate]);

  const openReviewModal = () => setReviewModalOpen(true);
  const closeReviewModal = () => setReviewModalOpen(false);

  const handleAddReview = (newReview) => {
    setReviews([newReview, ...reviews]);
    setRestaurant((prev) => ({
      ...prev,
      reviews: [newReview, ...(prev?.reviews || [])],
    }));
    closeReviewModal();
  };

  const getRatingDistribution = () => {
    const total = reviews.length;
    const counts = [0, 0, 0, 0, 0];
    reviews.forEach((review) => {
      const rating = parseInt(review.rating);
      if (rating >= 1 && rating <= 5) counts[rating - 1]++;
    });
    return counts.map((count) =>
      total === 0 ? 0 : Math.round((count / total) * 100)
    );
  };

  const ratingDistribution = getRatingDistribution();

  const sortedReviews = React.useMemo(() => {
    return [...reviews].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [reviews, sortOrder]);

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div>
      <main>
        <div className="main-content">
          <div className="page-container">
            <div className="images-wrapper">
              <button
                className="scroll-button left"
                onClick={() => scroll("left")}
              >
                ⯇
              </button>
              <div className="images" ref={scrollRef}>
                {restaurant.images?.map((url, idx) => (
                  <img src={url} alt={`Slide ${idx}`} key={idx} />
                ))}
              </div>

              <button
                className="scroll-button right"
                onClick={() => scroll("right")}
              >
                ⯈
              </button>
            </div>

            <div className="container12">
              <div className="left-section1">
                <h1>{restaurant.name}</h1>
                <p>{restaurant.address}</p>

                <div className="filters">
                  <p>
                    <strong>Restaurant type:</strong>
                  </p>
                  {restaurant.types?.map((t, idx) => (
                    <span key={idx}>{t}</span>
                  ))}
                </div>

                <div className="filters">
                  <p>
                    <strong>Establishment type:</strong>
                  </p>
                  {restaurant.establishments?.map((e, idx) => (
                    <span key={idx}>{e}</span>
                  ))}
                </div>

                <div className="filters">
                  <p>
                    <strong>Meal:</strong>
                  </p>
                  {restaurant.meals?.map((m, idx) => (
                    <span key={idx}>{m}</span>
                  ))}
                </div>

                <button className="menu" onClick={() => setShowModal(true)}>
                  See Menu
                </button>
              </div>

              <div className="right-section">
                <ul className="features1">
                  {restaurant.features?.map((f, i) => (
                    <li key={i}>✓ {f}</li>
                  ))}
                </ul>

                <div className="rating">
                  <div className="stars">★★★★★</div>
                  <span className="text-base">{restaurant.rating}</span>
                  <button onClick={openReviewModal}>
                    <i className="fa-solid fa-pen"></i> write a review
                  </button>
                </div>
                <p className="available">
                  <i className="fa-solid fa-map-pin"></i>{" "}
                  {restaurant.open ? "Open now" : "Closed"}
                </p>

                <div className="table-booking">
                  <h2>
                    <u>Book a Table</u>
                  </h2>

                  <label>Username</label>
                  <input
                    type="text"
                    value={bookingData.username}
                    placeholder="Enter full name"
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        username: e.target.value,
                      })
                    }
                  />

                  <label>Number of People</label>
                  <select
                    value={bookingData.people}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, people: e.target.value })
                    }
                  >
                    <option value="" disabled hidden>
                      No. of people
                    </option>
                    <option>2</option>
                    <option>4</option>
                    <option>6</option>
                    <option>8</option>
                  </select>

                  <label>Booking Date</label>
                  <input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, date: e.target.value })
                    }
                  />

                  <label>Booking Time</label>
                  <input
                    type="time"
                    value={bookingData.time}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, time: e.target.value })
                    }
                  />

                  <div className="total-price">
                    Advance Price: ₹{restaurant.advancePrice}
                  </div>
                  <button
                    className="book-btn"
                    onClick={() => setPaymentModalOpen(true)}
                    disabled={isBookingDisabled}
                  >
                    Book Table
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="review-section">
            <h1>Detailed Reviews</h1>
            <div className="semireview-section">
              <div className="review-conts">
                <p>
                  {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                </p>
                {[5, 4, 3, 2, 1].map((star) => (
                  <div className="rating-item" key={star}>
                    <span>{star} Star</span>
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${ratingDistribution[5 - star]}%` }}
                      ></div>
                    </div>
                    <span>{ratingDistribution[5 - star]}%</span>
                  </div>
                ))}
              </div>

              <div className="reviews">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
                <hr />
                {sortedReviews.map((review, index) => (
                  <div className="review-cards" key={index}>
                    <h2>{review.name}</h2>
                    <p>{review.text}</p>
                    <h5>{review.date}</h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <img
              src="https://d4t7t8y8xqo0t.cloudfront.net/app/resized/FALSEXFALSE/restaurant/648941/menu/648941_1.jpg"
              alt="Menu"
              className="menu-image"
            />
          </div>
        </div>
      )}

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={closeReviewModal}
        onSubmitReview={handleAddReview}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        bookingData={bookingData}
        amount={restaurant.advancePrice}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        bookingData={bookingData}
      />
    </div>
  );
};

export default RestaurantDetails;
