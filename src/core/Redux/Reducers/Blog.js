import ACTION_TYPES from 'core/Redux/Actions/ActionTypes';

const { SET_CATEGORIES, SET_POSTS } = ACTION_TYPES;

// CATEGORIES
export const categoriesReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CATEGORIES:
      return payload;

    default:
      return state;
  }
};

// POSTS
export const postsReducer = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_POSTS:
      return payload;

    default:
      return state;
  }
};
