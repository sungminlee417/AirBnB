import { csrfFetch } from "./csrf";

const ADD_BOOKING = `booking/ADD`;

export const addBooking = (booking) => {
  return {
    type: ADD_BOOKING,
    booking,
  };
};

export const createBookingThunk =
  (spotId, startDate, endDate) => async (dispatch) => {
    const response = await csrfFetch(`/spots/${spotId}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate,
        endDate,
      }),
    });
    const booking = await response.json();
    dispatch(addBooking(booking));
  };

const initialState = {};

export const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOKING:
      return action.booking;
    default:
      return state;
  }
};

export default bookingReducer;
