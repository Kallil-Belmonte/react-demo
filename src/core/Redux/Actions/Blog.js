import ACTION_TYPES from './ActionTypes';

// SET POSTS
export const setPosts = (posts) => {
  return {
    type: ACTION_TYPES.SET_POSTS,
    payload: posts
  };
};


// SET CATEGORIES
export const setCategories = (categories) => {
  return {
    type: ACTION_TYPES.SET_CATEGORIES,
    payload: categories
  };
};
