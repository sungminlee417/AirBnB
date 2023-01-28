import { csrfFetch } from "./csrf";

const LOAD_SPOT_REVIEWS = `/reviews/spot/LOAD`;
const ADD_REVIEW = `/reviews/spot/ADD`;
const EDIT_REVIEW = `/review/spot/EDIT`;
const DELETE_REVIEW = `/review/DELETE`;

export const loadSpotReviews = (reviews) => {
  return {
    type: LOAD_SPOT_REVIEWS,
    reviews,
  };
};

export const addSpotReview = (review) => {
  return {
    type: ADD_REVIEW,
    review,
  };
};

export const editSpotReview = (review) => {
  return {
    type: EDIT_REVIEW,
    review,
  };
};

export const deleteReview = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

export const loadSpotReviewsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/spots/${spotId}/reviews`);
  const reviews = await response.json();
  const reviewsObj = {};
  reviews.forEach((review) => {
    reviewsObj[review.id] = review;
  });
  dispatch(loadSpotReviews(reviewsObj));
};

export const createSpotReviewThunk = (spotId, payload) => async (dispatch) => {
  const response = await csrfFetch(`/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: payload,
  });

  const data = await response.json();
  dispatch(addSpotReview(data));
  return data;
};

export const editSpotReviewThunk = (reviewId, payload) => async (dispatch) => {
  const response = await csrfFetch(`/reviews/${reviewId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/reviews/${reviewId}`, {
    method: "DELETE",
  });

  dispatch(deleteReview(reviewId));
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOAD_SPOT_REVIEWS:
      return action.reviews;
    case ADD_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case EDIT_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case DELETE_REVIEW:
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
