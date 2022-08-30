import { useState } from "react";
import "./CreateBookingCard.css";

const CreateBookingCard = ({ spot }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(startDate, endDate);
  };

  const review =
    spot.numReviews > 1 || spot.numReviews === 0 ? "reviews" : "review";

  return (
    <div id="create-booking-card-container">
      <div id="create-booking-card">
        <div id="booking-card-spot-details">
          <div id="booking-card-price-container">
            <strong id="booking-card-price">${spot.price}</strong> night
          </div>
          <div id="booking-rating-container">
            <div id="booking-card-avg-star-rating-container">
              <i className="fa-solid fa-star"></i>
              <div id="booking-card-avg-star-rating">
                {spot.avgStarRating || 0}
              </div>
            </div>
            <div className="single-spot-details-break-line"></div>
            <div id="booking-card-num-reviews">{`${
              spot.numReviews || "No"
            } ${review}`}</div>
          </div>
        </div>
        <div id="booking-card-dates-form-container">
          <button id="booking-card-dates-button">
            <div className="booking-check-date">
              <div className="booking-check-date-name">CHECK-IN</div>
              <input
                type="date"
                className="booking-check-date-input"
                placeholder="Add date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div id="booking-dates-divider"></div>
            <div className="booking-check-date">
              <div className="booking-check-date-name">CHECKOUT</div>
              <input
                type="date"
                className="booking-check-date-input"
                placeholder="Add date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </button>
          <button id="reserve-button" onClick={onSubmit}>
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBookingCard;
