import { csrfFetch } from "./csrf";

const LOAD_BOOKINGS = `bookings/LOAD`;

export const loadYourBookings = (bookings) => {
  return {
    type: LOAD_BOOKINGS,
    bookings,
  };
};

export const loadYourBookingsThunk = () => async (dispatch) => {
  const response = await csrfFetch(`/me/bookings`);
  const { Bookings } = await response.json();
  const bookingsObj = {};
  Bookings.forEach((booking) => {
    bookingsObj[booking.id] = booking;
  });
  dispatch(loadYourBookings(bookingsObj));
};

const initialState = {};

export const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BOOKINGS:
      return action.bookings;
    default:
      return state;
  }
};

export default bookingsReducer;
