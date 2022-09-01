import { useState } from "react";
import { useDispatch } from "react-redux";
import * as bookingActions from "../../../../store/bookings";
import "./EditBooking.css";

const EditBooking = ({ booking, setShowModal }) => {
  const dispatch = useDispatch();
  const { startDate, endDate } = booking;
  const [editStartDate, setEditStartDate] = useState(startDate);
  const [editEndDate, setEditEndDate] = useState(endDate);
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const date = new Date();
  const year = date.getFullYear();
  const month =
    (date.getMonth() + 1).toString().length === 1
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const day = date.getDate();

  const today = `${year}-${month}-${day}`;

  if (submitted) {
    setShowModal(false);
  }

  const onSubmit = (e) => {
    setErrors([]);
    e.preventDefault();

    dispatch(
      bookingActions.editBookingThunk(booking.id, editStartDate, editEndDate)
    ).catch(async (res) => {
      const data = await res.json();
      const errorArray = [];
      if (data.errors)
        Object.values(data.errors).forEach((error) => errorArray.push(error));
      setErrors(errorArray);
    });

    if (errors.length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <div id="edit-booking-container">
      <button id="edit-booking-container-button">
        <div className="booking-check-date">
          <div className="booking-check-date-name">CHECK-IN</div>
          <input
            type="date"
            className="booking-check-date-input"
            placeholder="Add date"
            value={editStartDate}
            onChange={(e) => setEditStartDate(e.target.value)}
            min={today}
          />
        </div>
        <div id="booking-dates-divider"></div>
        <div className="booking-check-date">
          <div className="booking-check-date-name">CHECKOUT</div>
          <input
            type="date"
            className="booking-check-date-input"
            placeholder="Add date"
            value={editEndDate}
            onChange={(e) => setEditEndDate(e.target.value)}
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

      <button id="edit-button" onClick={onSubmit}>
        Submit edit
      </button>
    </div>
  );
};

export default EditBooking;
