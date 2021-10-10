import React, { useCallback, useEffect } from 'react';

import { useAppSelector, useAppDispatch, useCustomState } from '@/shared/hooks';
import { setPosts } from '@/core/redux/reducers/news';
import AppDashboard from '@/core/layout/AppDashboard/AppDashboard';
// import Loader from '@/shared/components/Loader/Loader';
// import FeaturedPosts from './FeaturedPosts/FeaturedPosts';

const initialState = {
  isLoading: false,
  featuredPosts: [],
};

const Home = () => {
  // const { posts } = useAppSelector(state => state.news);
  // const dispatch = useAppDispatch();
  // const [state, setState] = useCustomState(initialState);
  // const { isLoading, featuredPosts } = state;

  // const getFeaturedPosts = useCallback(async () => {
  //   if (posts.length) {
  //     const [firstPost, secondPost, thirdPost] = posts;
  //     setState({ featuredPosts: [firstPost, secondPost, thirdPost] });
  //   } else {
  //     setState({ isLoading: true });

  //     try {
  //       const { data: posts } = await axios.get(blog.posts);
  //       const [firstPost, secondPost, thirdPost] = posts;
  //       setState({ featuredPosts: [firstPost, secondPost, thirdPost] });
  //       dispatch(setPosts(posts));
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setState({ isLoading: false });
  //     }
  //   }
  // }, [posts, dispatch]);

  // // LIFECYCLE HOOKS
  // useEffect(() => {
  //   getFeaturedPosts();
  // }, []);

  return (
    <AppDashboard>
      <main data-component="Home">
        {/* <Loader isLoading={isLoading} /> */}

        {/* <FeaturedPosts posts={featuredPosts} /> */}
      </main>
    </AppDashboard>
  );
};

export default Home;
