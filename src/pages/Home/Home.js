import React, { useReducer, useCallback, useEffect } from 'react';

import { connect } from 'react-redux';

import axios, { ENDPOINTS } from 'core/api';
import State from 'core/hooks/State';
import * as Actions from 'core/redux/actions';
import Dashboard from 'layout/Dashboard';
import Loader from 'shared/components/Loader/Loader';
import FeaturedPosts from 'pages/Home/FeaturedPosts/FeaturedPosts';

const { blog } = ENDPOINTS;

const initialState = {
  isLoading: false,
  featuredPosts: [],
};

const Home = ({ posts, dispatchSetPosts }) => {
  const [state, setState] = useReducer(State, initialState);
  const { isLoading, featuredPosts } = state;

  const getFeaturedPosts = useCallback(async () => {
    if (posts.length) {
      const [firstPost, secondPost, thirdPost] = posts;
      setState({ featuredPosts: [firstPost, secondPost, thirdPost] });
    } else {
      setState({ isLoading: true });

      try {
        const { data: posts } = await axios.get(blog.posts);
        const [firstPost, secondPost, thirdPost] = posts;
        setState({ featuredPosts: [firstPost, secondPost, thirdPost] });
        dispatchSetPosts(posts);
      } catch (error) {
        console.error(error);
      } finally {
        setState({ isLoading: false });
      }
    }
  }, [posts, dispatchSetPosts]);

  // LIFECYCLE HOOKS
  useEffect(() => {
    getFeaturedPosts();
  }, []); // eslint-disable-line

  return (
    <Dashboard>
      <main data-component="Home">
        <Loader isLoading={isLoading} />

        <FeaturedPosts posts={featuredPosts} />
      </main>
    </Dashboard>
  );
};

const mapStateToProps = ({ posts }) => ({
  posts,
});

const mapDispatchToProps = dispatch => ({
  dispatchSetPosts: posts => dispatch(Actions.setPosts(posts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
