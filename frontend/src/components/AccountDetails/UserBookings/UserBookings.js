import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as bookingsActions from "../../../store/bookings";
import UserBookingsItem from "./UserBookingsItem";
import "./UserBookings.css";

const UserBookings = () => {
  const dispatch = useDispatch();
  const bookings = Object.values(useSelector((state) => state.bookings));

  useEffect(() => {
    dispatch(bookingsActions.loadYourBookingsThunk());
  }, [dispatch]);

  return (
    <div>
      {bookings && (
        <ul>
          {bookings.map((booking, i) => {
            return <UserBookingsItem key={i} booking={booking} />;
          })}
        </ul>
      )}
      {!bookings.length && (
        <div id="no-bookings-available">You currently have no bookings</div>
      )}
    </div>
  );
};

export default UserBookings;
