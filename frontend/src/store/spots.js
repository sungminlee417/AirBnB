import { csrfFetch } from "./csrf";

const LOAD_SPOTS = `spots/LOAD`;
const CLEAR_SPOTS = `spots/CLEAR`;
const EDIT_SPOT = `spot/EDIT`;
const DELETE_SPOT = `spot/DELETE`;

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

export const editSpot = (spot) => {
  return {
    type: EDIT_SPOT,
    spot,
  };
};

export const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId,
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

export const loadYourSpotsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/me/spots");
  const spots = await response.json();
  const spotsObj = {};
  spots.Spots.forEach((spot) => {
    spotsObj[spot.id] = spot;
  });

  dispatch(loadSpots(spotsObj));
};

export const editSpotThunk = (spotId, spot) => async (dispatch) => {
  const response = await csrfFetch(`/spots/${spotId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spot),
  });
  const spotData = await response.json();

  dispatch(editSpot(spotData));
};

export const deleteASpotThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/spots/${spotId}`, {
    method: "DELETE",
  });
  dispatch(deleteSpot(spotId));
};

const initialState = {};

const spotReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_SPOTS:
      return action.spots;
    case CLEAR_SPOTS:
      return action.spots;
    case EDIT_SPOT:
      const spot = newState[action.spot.id];
      spot.address = action.spot.address;
      spot.city = action.spot.city;
      spot.country = action.spot.country;
      spot.lat = action.spot.lat;
      spot.lng = action.spot.lng;
      spot.name = action.spot.name;
      spot.description = action.spot.description;
      spot.price = action.spot.price;
      spot.previewImage = action.spot.previewImage;
      return newState;
    case DELETE_SPOT:
      delete newState[action.spotId];
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
