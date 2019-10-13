import ACTION_TYPES from 'core/Redux/Actions/ActionTypes';

// SET POST
export const setPost = (post) => {
  return {
    type: ACTION_TYPES.SET_CURRENT_POST,
    payload: post,
  };
};


// EDIT POST
export const editPost = (post) => {
  return {
    type: ACTION_TYPES.EDIT_CURRENT_POST,
    payload: post,
  };
};
