import { csrfFetch } from "./csrf";

const LOAD_SPOTS = `spots/LOAD`;
const CLEAR_SPOTS = `spots/CLEAR`;

export const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots,
  };
};

export const clearSpots = () => {
  return {
    type: CLEAR_SPOTS,
    spots: {},
  };
};

export const loadAllSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch(`/spots`);
  const spots = await response.json();
  const spotsObj = {};
  spots.Spots.forEach((spot) => {
    spotsObj[spot.id] = spot;
  });

  dispatch(loadSpots(spotsObj));
};

const initialState = {};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      return action.spots;
    case CLEAR_SPOTS:
      return action.spots;
    default:
      return state;
  }
};

export default spotReducer;
