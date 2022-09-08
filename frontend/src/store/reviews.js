import { csrfFetch } from "./csrf";

const LOAD_SPOT_REVIEWS = `/reviews/spot/LOAD`;

export const loadSpotReviews = (reviews) => {
  return {
    type: LOAD_SPOT_REVIEWS,
    reviews,
  };
};

export const loadSpotReviewsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/spots/${spotId}/reviews`);
  const { Reviews } = await response.json();
  const reviewsObj = {};
  Reviews.forEach((review) => {
    reviewsObj[review.id] = review;
  });
  dispatch(loadSpotReviews(reviewsObj));
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOT_REVIEWS:
      return action.reviews;
    default:
      return state;
  }
};

export default reviewsReducer;
