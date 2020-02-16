import ACTION_TYPES from 'core/Redux/Actions/ActionTypes';

// LOG IN
export const logIn = (userData) => ({
  type: ACTION_TYPES.LOG_IN,
  payload: userData,
});


// LOG OUT
export const logOut = () => ({
  type: ACTION_TYPES.LOG_OUT,
});
