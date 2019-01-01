import ACTION_TYPES from '../Actions/ActionTypes';

// POSTS
export const postsReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_POSTS:
      return action.payload;

    default:
      return state;
  }
};


// CATEGORIES
export const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CATEGORIES:
      return action.payload;

    default:
      return state;
  }
};
