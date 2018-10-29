import ACTION_TYPES from './ActionTypes';

// EDIT ACCOUNT
export const editAccount = (post) => {
  return {
    type: ACTION_TYPES.EDIT_ACCOUNT,
    payload: post
  };
};
