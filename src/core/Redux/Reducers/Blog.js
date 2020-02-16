import ACTION_TYPES from 'core/Redux/Actions/ActionTypes';

const { SET_POSTS, SET_CATEGORIES } = ACTION_TYPES;

// POSTS
export const postsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_POSTS:
      return action.payload;

    default:
      return state;
  }
};


// CATEGORIES
export const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.payload;

    default:
      return state;
  }
};
