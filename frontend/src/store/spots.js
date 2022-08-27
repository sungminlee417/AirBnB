import { csrfFetch } from "./csrf";

const LOAD_SPOTS = `spots/LOAD`;

export const loadAllSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots,
  };
};

export const loadAllSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch(`/spots`);
  const spots = await response.json();

  dispatch(loadAllSpots(spots.Spots));
};

const initialState = {};

const flattenAllSpots = (state, spots) => {
  spots.forEach((spot) => {
    state[spot.id] = spot;
  });
};

const spotReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_SPOTS:
      flattenAllSpots(newState, action.spots);
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
