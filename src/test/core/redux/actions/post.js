import ACTION_TYPES from 'core/redux/actions/actionTypes';

const { SET_CURRENT_POST } = ACTION_TYPES;

// SET CURRENT POST
export const setCurrentPost = post => ({
  type: SET_CURRENT_POST,
  payload: post,
});
