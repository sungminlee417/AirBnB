import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as bookingActions from "../../store/singleBooking";

const SuccessfulBooking = () => {
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.booking);

  useEffect(() => {
    return () => dispatch(bookingActions.clearBooking());
  }, []);

  return <div>Congrats</div>;
};

export default SuccessfulBooking;
