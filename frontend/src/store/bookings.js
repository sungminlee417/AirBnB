import { csrfFetch } from "./csrf";

const LOAD_BOOKINGS = `bookings/LOAD`;
const DELETE_BOOKING = `booking/DELETE`;
const EDIT_BOOKING = `booking/EDIT`;

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

export const editBooking = (booking) => {
  return {
    type: EDIT_BOOKING,
    booking,
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
  await csrfFetch(`/bookings/${bookingId}`, {
    method: "DELETE",
  });
  dispatch(deleteBooking(bookingId));
};

export const editBookingThunk =
  (bookingId, startDate, endDate) => async (dispatch) => {
    const response = await csrfFetch(`/bookings/${bookingId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate,
        endDate,
      }),
    });
    const booking = await response.json();
    dispatch(editBooking(booking));
  };

const initialState = {};

export const bookingsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_BOOKINGS:
      return action.bookings;
    case DELETE_BOOKING:
      delete newState[action.bookingId];
      return newState;
    case EDIT_BOOKING:
      const booking = newState[action.booking.id];
      booking.startDate = action.booking.startDate;
      booking.endDate = action.booking.endDate;
      return newState;
    default:
      return state;
  }
};

export default bookingsReducer;
