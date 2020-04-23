import ACTION_TYPES from 'core/Redux/Actions/ActionTypes';

const { SET_POSTS, SET_CATEGORIES } = ACTION_TYPES;

// SET POSTS
export const setPosts = (posts) => ({
  type: SET_POSTS,
  payload: posts,
});

// SET CATEGORIES
export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});
