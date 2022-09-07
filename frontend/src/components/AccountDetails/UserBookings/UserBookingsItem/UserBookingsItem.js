import DeleteBookingModal from "../DeleteBookingModal/DeleteBookingModal";
import EditBookingModal from "../EditBookingModal/EditBookingModal";
import "./UserBookingsItem.css";

const UserBookingsItem = ({ booking }) => {
  let image;
  let name;
  let address;
  let city;
  let state;

  if (booking.Spot) {
    image = booking.Spot.previewImage;
    name = booking.Spot.name;
    address = booking.Spot.address;
    city = booking.Spot.city;
    state = booking.Spot.state;
  }

  return (
    <div id="user-bookings-item">
      <div id="user-bookings-item-img-container">
        <img className="user-bookings-item-img" src={image} alt={name} />
      </div>
      <div id="user-booking-details">
        <div id="booking-spot-details">
          <div id="booking-spot-name">{name}</div>
          <div className="booking-spot-address">{address}</div>
          <div className="booking-spot-address">{city},</div>
          <div className="booking-spot-address">{state}</div>
        </div>
        <div className="booking-detail-check-date">
          <div className="booking-spot-check-bold">Check-In Date</div>
          <div className="booking-spot-check-light">{booking.startDate}</div>
        </div>
        <div className="booking-detail-check-date">
          <div className="booking-spot-check-bold">Checkout Date</div>
          <div className="booking-spot-check-light">{booking.endDate}</div>
        </div>
        <div className="booking-edit-container">
          <EditBookingModal booking={booking} />
          <DeleteBookingModal booking={booking} />
        </div>
      </div>
    </div>
  );
};

export default UserBookingsItem;
