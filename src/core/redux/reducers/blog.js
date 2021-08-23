import { createSlice } from '@reduxjs/toolkit';
// import ACTION_TYPES from 'core/redux/actions/actionTypes';
// import updateState from './utility';

// const { SET_CATEGORIES, SET_POSTS, SET_CURRENT_POST } = ACTION_TYPES;

// // CATEGORIES
// export const categoriesReducer = (state = [], action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case SET_CATEGORIES:
//       return payload;

//     default:
//       return state;
//   }
// };

// // POSTS
// export const postsReducer = (state = [], action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case SET_POSTS:
//       return payload;

//     default:
//       return state;
//   }
// };

// // CURRENT POST
// export const currentPostReducer = (state = {}, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case SET_CURRENT_POST:
//       return updateState(state, payload);

//     default:
//       return state;
//   }
// };

const initialState = {
  categories: [],
  posts: [],
  currentPost: {},
};

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      const { payload } = action;
      state.categories = payload;
    },
    setPosts: (state, action) => {
      const { payload } = action;
      state.posts = payload;
    },
    setCurrentPost: (state, action) => {
      const { payload } = action;
      state.currentPost = payload;
    },
  },
});

export default blogSlice.reducer;
