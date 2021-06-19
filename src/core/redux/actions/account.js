import ACTION_TYPES from 'core/redux/actions/actionTypes';

const { EDIT_ACCOUNT } = ACTION_TYPES;

// EDIT ACCOUNT
export const editAccount = userData => ({
  type: EDIT_ACCOUNT,
  payload: userData,
});
