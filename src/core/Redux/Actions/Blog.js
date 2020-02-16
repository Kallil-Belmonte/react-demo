import ACTION_TYPES from 'core/Redux/Actions/ActionTypes';

// SET POSTS
export const setPosts = (posts) => ({
  type: ACTION_TYPES.SET_POSTS,
  payload: posts,
});


// SET CATEGORIES
export const setCategories = (categories) => ({
  type: ACTION_TYPES.SET_CATEGORIES,
  payload: categories,
});
