import { createSlice } from '@reduxjs/toolkit';

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

export const { setCategories, setPosts, setCurrentPost } = blogSlice.action;

export default blogSlice.reducer;
