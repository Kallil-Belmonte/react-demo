import React, { useReducer, useCallback, useEffect } from 'react';

import axios, { ENDPOINTS } from 'core/API/API';
import Reducer from 'core/Hooks/Reducer';
import Dashboard from 'layout/Dashboard';
import Loader from 'shared/Components/Loader/Loader';
import FeaturedPosts from 'pages/Home/FeaturedPosts/FeaturedPosts';

const { blog } = ENDPOINTS;

const initialState = {
  isLoading: true,
  posts: [],
};

const Home = () => {
  const [state, setState] = useReducer(Reducer, initialState);
  const { isLoading, posts } = state;

  // GET FEATURED POSTS
  const getFeaturedPosts = useCallback(async () => {
    try {
     const { data: posts } = await axios.get(blog.posts);
     const [firstPost, secondPost, thirdPost] = posts;
     setState({ posts: [firstPost, secondPost, thirdPost] })
    } catch (error) {
      console.error(error);
    } finally {
      setState({ isLoading: false });
    }
  }, []);

  // LIFECYCLE HOOKS
  useEffect(() => {
    getFeaturedPosts();
  }, []); // eslint-disable-line

  return (
    <Dashboard>
      <main data-component="Home">
        <Loader isLoading={isLoading} />

        <FeaturedPosts posts={posts} />
      </main>
    </Dashboard>
  );
};

export default Home;
