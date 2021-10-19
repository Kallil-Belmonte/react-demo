import React, { useEffect } from 'react';

import { HomeState } from '@/pages/Home/_files/types';
import { useAppSelector, useAppDispatch, useCustomState } from '@/shared/hooks';
import { setPosts } from '@/core/redux/reducers/news';
import { getPosts } from '@/core/services/news';
import { AppLoader } from '@/shared/components';
import FeaturedPosts from './FeaturedPosts/FeaturedPosts';

const initialState: HomeState = {
  isLoading: false,
  featuredPosts: [],
};

const Home = () => {
  const { posts } = useAppSelector(state => state.news);
  const dispatch = useAppDispatch();

  const [state, setState] = useCustomState<HomeState>(initialState);
  const { isLoading, featuredPosts } = state;

  const getFeaturedPosts = async () => {
    if (posts.length) {
      const [firstPost, secondPost, thirdPost] = posts;
      setState({ featuredPosts: [firstPost, secondPost, thirdPost] });
    } else {
      setState({ isLoading: true });

      try {
        const posts = await getPosts();
        const [firstPost, secondPost, thirdPost] = posts;
        setState({ featuredPosts: [firstPost, secondPost, thirdPost] });
        dispatch(setPosts(posts));
      } catch (error) {
        console.error(error);
      } finally {
        setState({ isLoading: false });
      }
    }
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    getFeaturedPosts();
  }, []);

  return (
    <main data-component="Home">
      <AppLoader isLoading={isLoading} />
      <FeaturedPosts posts={featuredPosts} />
    </main>
  );
};

export default Home;
