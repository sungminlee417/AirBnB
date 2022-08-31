import DeleteBookingModal from "../DeleteBookingModal/DeleteBookingModal";
import EditBookingModal from "../EditBookingModal/EditBookingModal";
import "./UserBookingsItem.css";

const UserBookingsItem = ({ booking }) => {
  return (
    <>
      <li className="user-bookings-item">
        <img
          className="user-bookings-item-img"
          src={booking.Spot.previewImage}
        />
        <div id="user-booking-details">
          <div id="booking-spot-details">
            <div id="booking-spot-name">{booking.Spot.name}</div>
            <div className="booking-spot-address">{booking.Spot.address}</div>
            <div className="booking-spot-address">{booking.Spot.city},</div>
            <div className="booking-spot-address">{booking.Spot.state}</div>
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
            <EditBookingModal />
            <DeleteBookingModal booking={booking} />
          </div>
        </div>
      </li>
      <div className="user-bookings-items-divider"></div>
    </>
  );
};

export default UserBookingsItem;
