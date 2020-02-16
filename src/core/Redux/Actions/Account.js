import ACTION_TYPES from 'core/Redux/Actions/ActionTypes';

// EDIT ACCOUNT
export const editAccount = (userData) => ({
  type: ACTION_TYPES.EDIT_ACCOUNT,
  payload: userData,
});
