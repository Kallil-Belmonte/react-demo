import React, { useReducer, useEffect } from 'react';

import axios, { ENDPOINTS } from 'core/API/API';
import Reducer from 'core/Hooks/Reducer';
import Dashboard from 'layout/Dashboard';
import Loader from 'shared/Components/Loader/Loader';
import FeaturedPosts from 'pages/Home/FeaturedPosts/FeaturedPosts';

const { blog } = ENDPOINTS;

const initialState = {
  loading: true,
  posts: [],
};

const Home = () => {
  const [state, setState] = useReducer(Reducer, initialState);

  const { loading, posts } = state;

  // GET FEATURED POSTS
  const getFeaturedPosts = async () => {
    try {
     const { data } = await axios.get(blog.posts);
     const [firstPost, secondPost, thirdPost] = data;
     setState({ posts: [firstPost, secondPost, thirdPost] })
    } catch (error) {
      console.error(error);
    } finally {
      setState({ loading: false });
    }
  }

  // LIFECYCLE HOOKS
  useEffect(() => {
    getFeaturedPosts();
  }, []);

  return (
    <Dashboard>
      <main data-component="Home">
        <Loader loading={loading} />

        <FeaturedPosts posts={posts} />
      </main>
    </Dashboard>
  );
};

export default Home;
