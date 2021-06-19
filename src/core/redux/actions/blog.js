import ACTION_TYPES from 'core/redux/actions/actionTypes';

const { SET_CATEGORIES, SET_POSTS } = ACTION_TYPES;

// SET CATEGORIES
export const setCategories = categories => ({
  type: SET_CATEGORIES,
  payload: categories,
});

// SET POSTS
export const setPosts = posts => ({
  type: SET_POSTS,
  payload: posts,
});
