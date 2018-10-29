import ACTION_TYPES from './ActionTypes';

// LOG IN
export const logIn = (userData) => {
  return {
    type: ACTION_TYPES.LOG_IN,
    payload: userData
  };
};


// LOG OUT
export const logOut = () => {
  return {
    type: ACTION_TYPES.LOG_OUT
  };
};
