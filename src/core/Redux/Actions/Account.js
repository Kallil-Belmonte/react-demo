import ACTION_TYPES from './ActionTypes';

// EDIT ACCOUNT
export const editAccount = (userData) => {
  return {
    type: ACTION_TYPES.EDIT_ACCOUNT,
    payload: userData,
  };
};
