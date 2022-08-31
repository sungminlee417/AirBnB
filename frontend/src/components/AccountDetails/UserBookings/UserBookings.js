import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as bookingsActions from "../../../store/bookings";
import UserBookingsItem from "./UserBookingsItem";

const UserBookings = () => {
  const dispatch = useDispatch();
  const bookings = Object.values(useSelector((state) => state.bookings));

  useEffect(() => {
    dispatch(bookingsActions.loadYourBookingsThunk());
  }, []);

  return (
    <div className="your-bookings-container">
      <ul>
        {bookings.map((booking, i) => {
          return <UserBookingsItem key={i} booking={booking} />;
        })}
      </ul>
    </div>
  );
};

export default UserBookings;
