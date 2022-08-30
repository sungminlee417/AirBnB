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
    if (booking.ok) {
      dispatch(addBooking(booking));
    }
  };

const initialState = {};

export const bookingReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ADD_BOOKING:
      newState[action.booking.id] = action.booking;
      return newState;
    default:
      return newState;
  }
};

export default bookingReducer;
