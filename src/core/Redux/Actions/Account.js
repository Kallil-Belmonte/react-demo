import ACTION_TYPES from 'core/Redux/Actions/ActionTypes';

const { EDIT_ACCOUNT } = ACTION_TYPES;

// EDIT ACCOUNT
export const editAccount = (userData) => ({
  type: EDIT_ACCOUNT,
  payload: userData,
});
