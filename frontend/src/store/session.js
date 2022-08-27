import { csrfFetch } from "./csrf";

const SET_USER = `user/SET`;
const REMOVE_USER = `user/REMOVE`;

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const removeUser = (user) => {
  return {
    type: SET_USER,
  };
};

export const login = (email, password) => async (dispatch) => {
  const response = await csrfFetch(`/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const user = await response.json();
  dispatch(setUser(user));
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch(`/me`);

  const user = await response.json();
  dispatch(setUser(user));
};

export const signup = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const user = await response.json();
  dispatch(setUser(user));
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch(`/logout`, {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

const initialState = {
  user: null,
};

const sessionReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case SET_USER:
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState.user = null;
      return newState;
    default:
      return newState;
  }
};

export default sessionReducer;
