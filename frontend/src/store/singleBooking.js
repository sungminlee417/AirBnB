import { csrfFetch } from "./csrf";

const ADD_BOOKING = `booking/ADD`;
const CLEAR_BOOKING = `booking/REMOVE`;

export const addBooking = (booking) => {
  return {
    type: ADD_BOOKING,
    booking,
  };
};

export const clearBooking = () => {
  return {
    type: CLEAR_BOOKING,
    booking: null,
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

const initialState = {
  booking: null,
};

export const bookingReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ADD_BOOKING:
      newState[action.booking.id] = action.booking;
      return newState;
    case CLEAR_BOOKING:
      return action.booking;
    default:
      return state;
  }
};

export default bookingReducer;
