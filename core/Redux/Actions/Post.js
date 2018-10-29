import ACTION_TYPES from './ActionTypes';

// GET POST
export const getPost = (post) => {
  return {
    type: ACTION_TYPES.GET_CURRENT_POST,
    payload: post
  };
};


// EDIT POST
export const editPost = (post) => {
  return {
    type: ACTION_TYPES.EDIT_CURRENT_POST,
    payload: post
  };
};
