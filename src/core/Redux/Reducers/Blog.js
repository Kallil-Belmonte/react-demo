import ACTION_TYPES from '../Actions/ActionTypes';

// POSTS
export const postsReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_POSTS:
      return action.payload;

    default:
      return state;
  }
};


// CATEGORIES
export const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_CATEGORIES:
      return action.payload;

    default:
      return state;
  }
};
