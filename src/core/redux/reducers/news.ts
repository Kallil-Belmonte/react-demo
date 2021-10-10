import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Category, Post } from '@/core/services/news/types';

type NewsState = {
  categories: Category[];
  posts: Post[];
  currentPost: Post;
};

const initialState: NewsState = {
  categories: [],
  posts: [],
  currentPost: {
    userId: 0,
    id: 0,
    title: '',
    body: '',
  },
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<NewsState['categories']>) => {
      const { payload } = action;
      state.categories = payload;
    },
    setPosts: (state, action: PayloadAction<NewsState['posts']>) => {
      const { payload } = action;
      state.posts = payload;
    },
    setCurrentPost: (state, action: PayloadAction<NewsState['currentPost']>) => {
      const { payload } = action;
      state.currentPost = payload;
    },
  },
});

export const { setCategories, setPosts, setCurrentPost } = newsSlice.actions;
export default newsSlice.reducer;
