import { csrfFetch } from "./csrf";

const LOAD_BOOKINGS = `bookings/LOAD`;
const DELETE_BOOKING = `booking/DELETE`;

export const loadYourBookings = (bookings) => {
  return {
    type: LOAD_BOOKINGS,
    bookings,
  };
};

export const deleteBooking = (bookingId) => {
  return {
    type: DELETE_BOOKING,
    bookingId,
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

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/bookings/${bookingId}`, {
    method: "DELETE",
  });
  dispatch(deleteBooking(bookingId));
};

const initialState = {};

export const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BOOKINGS:
      return action.bookings;
    case DELETE_BOOKING:
      const newState = { ...state };
      delete newState[action.bookingId];
      return newState;
    default:
      return state;
  }
};

export default bookingsReducer;
