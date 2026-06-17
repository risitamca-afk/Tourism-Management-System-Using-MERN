import React, { useState } from "react";
import "../Restaurant/RestaurantPage.css";
import "./ReviewModal.css";

const ReviewModal = ({ isOpen, onClose, onSubmitReview }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    const formattedDate = now.toLocaleString();

    onSubmitReview({
      name: name.trim() || "Anonymous",
      rating: parseInt(rating),
      text: text.trim(),
      date: formattedDate,
    });

    // Clear form fields after submit
    setName("");
    setRating("5");
    setText("");
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="heading">
          <h2>Write a Review</h2>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            <option value="" disabled hidden>
              Choose rating
            </option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} Star{star > 1 ? "s" : ""}
              </option>
            ))}
          </select>

          <label htmlFor="reviewText">Your Review:</label>
          <textarea
            id="reviewText"
            rows="5"
            placeholder="Write your review..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
