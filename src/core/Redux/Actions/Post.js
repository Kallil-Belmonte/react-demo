import ACTION_TYPES from 'core/Redux/Actions/ActionTypes';

const { SET_CURRENT_POST, EDIT_CURRENT_POST } = ACTION_TYPES;

// SET CURRENT POST
export const setCurrentPost = (post) => ({
  type: SET_CURRENT_POST,
  payload: post,
});

// EDIT CURRENT POST
export const editCurrentPost = (post) => ({
  type: EDIT_CURRENT_POST,
  payload: post,
});
