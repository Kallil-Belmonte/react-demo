import ACTION_TYPES from 'core/Redux/Actions/ActionTypes';

const { SET_CURRENT_POST, EDIT_CURRENT_POST } = ACTION_TYPES;

// SET POST
export const setPost = (post) => ({
  type: SET_CURRENT_POST,
  payload: post,
});


// EDIT POST
export const editPost = (post) => ({
  type: EDIT_CURRENT_POST,
  payload: post,
});
