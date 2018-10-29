import ACTION_TYPES from './ActionTypes';

// GET POSTS
export const getPosts = (posts) => {
  return {
    type: ACTION_TYPES.GET_POSTS,
    payload: posts
  };
};


// GET CATEGORIES
export const getCategories = (categories) => {
  return {
    type: ACTION_TYPES.GET_CATEGORIES,
    payload: categories
  };
};
