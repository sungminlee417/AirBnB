import { csrfFetch } from "./csrf";

const LOAD_SPOT = `spot/LOAD`;
const CLEAR_SPOT = `spot/CLEAR`;

export const loadSpot = (spot) => {
  return {
    type: LOAD_SPOT,
    spot,
  };
};

export const clearSpot = () => {
  return {
    type: CLEAR_SPOT,
    spot: {},
  };
};

export const loadOneSpotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/spots/${spotId}`);
  const spot = await response.json();

  dispatch(loadSpot(spot));
};

const initialState = {};

const singleSpotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOT:
      return action.spot;
    case CLEAR_SPOT:
      return action.spot;
    default:
      return state;
  }
};

export default singleSpotReducer;
