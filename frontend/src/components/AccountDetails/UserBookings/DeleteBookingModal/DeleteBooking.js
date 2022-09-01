import { useDispatch } from "react-redux";
import * as bookingsActions from "../../../../store/bookings";
import "./DeleteBooking.css";

const DeleteBooking = ({ booking, setShowModal }) => {
  const dispatch = useDispatch();
  const date = new Date(booking.createdAt);
  const bookingCreatedAtDateArr = date[Symbol.toPrimitive]("string")
    .split(" ")
    .splice(1, 3);
  const bookingCreatedAtDate = `${
    bookingCreatedAtDateArr[0] + " " + bookingCreatedAtDateArr[1]
  }, ${bookingCreatedAtDateArr[2]}`;

  const onDelete = () => {
    dispatch(bookingsActions.deleteBookingThunk(booking.id));
    setShowModal(false);
  };

  return (
    <div id="delete-booking-container">
      <header id="delete-booking-header">
        Permanently delete this booking?
      </header>
      <div id="delete-booking-card-container">
        <img
          id="delete-booking-card-image"
          src={booking.Spot.previewImage}
          alt={booking.Spot.name}
        />
        <div id="delete-booking-card-container-details">
          <div id="delete-booking-card-container-spot-name">
            {booking.Spot.name}
          </div>
          <div id="delete-booking-card-container-created-date">
            Originally booked {bookingCreatedAtDate}
          </div>
        </div>
      </div>
      <button id="delete-booking-button" onClick={onDelete}>
        Delete booking
      </button>
    </div>
  );
};

export default DeleteBooking;
