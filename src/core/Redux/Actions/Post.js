import ACTION_TYPES from 'core/Redux/Actions/ActionTypes';

const { SET_CURRENT_POST } = ACTION_TYPES;

// SET CURRENT POST
export const setCurrentPost = (post) => ({
  type: SET_CURRENT_POST,
  payload: post,
});
