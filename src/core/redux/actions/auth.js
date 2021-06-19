import ACTION_TYPES from 'core/redux/actions/actionTypes';

const { LOG_IN, LOG_OUT } = ACTION_TYPES;

// LOG IN
export const logIn = userData => ({
  type: LOG_IN,
  payload: userData,
});

// LOG OUT
export const logOut = () => ({
  type: LOG_OUT,
});
