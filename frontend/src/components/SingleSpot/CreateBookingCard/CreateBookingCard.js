import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginFormModal from "../../LoginFormModal";
import "./CreateBookingCard.css";
import * as bookingActions from "../../../store/bookings";

const CreateBookingCard = ({ spot }) => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state.session.user);

  const onSubmit = (e) => {
    setErrors([]);
    e.preventDefault();
    dispatch(
      bookingActions.createBookingThunk(spot.id, startDate, endDate)
    ).catch(async (res) => {
      const data = await res.json();
      const errorArray = [];
      if (data.message) errorArray.push(data.message);
      if (data.errors)
        Object.values(data.errors).forEach((error) => errorArray.push(error));
      setErrors(errorArray);
    });
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
          <ul className="errors">
            {Object.values(errors).map((error, i) => {
              return (
                <div key={i} className="error">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <li>{error}</li>
                </div>
              );
            })}
          </ul>
          <>
            {user && (
              <button id="reserve-button" onClick={onSubmit}>
                Reserve
              </button>
            )}
            {!user && <LoginFormModal type={"createBooking"} />}
          </>
        </div>
      </div>
    </div>
  );
};

export default CreateBookingCard;
