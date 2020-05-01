import React, { useReducer, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';

import axios, { ENDPOINTS } from 'core/API/API';
import Reducer from 'core/Hooks/Reducer';
import * as actionCreators from 'core/Redux/Actions/ActionCreators';
import Dashboard from 'layout/Dashboard';
import Loader from 'shared/Components/Loader/Loader';
import FeaturedPosts from 'pages/Home/FeaturedPosts/FeaturedPosts';

const { blog } = ENDPOINTS;

const initialState = {
  isLoading: false,
  featuredPosts: [],
};

const Home = ({ posts, dispatchSetPosts }) => {
  const [state, setState] = useReducer(Reducer, initialState);
  const { isLoading, featuredPosts } = state;

  // GET FEATURED POSTS
  const getFeaturedPosts = useCallback(async () => {
    if (posts.length) {
      const [firstPost, secondPost, thirdPost] = posts;
      setState({ featuredPosts: [firstPost, secondPost, thirdPost] });
    } else {
      setState({ isLoading: true });

      try {
       const { data } = await axios.get(blog.posts);
       const [firstPost, secondPost, thirdPost] = data.posts;
       setState({ featuredPosts: [firstPost, secondPost, thirdPost] });
       dispatchSetPosts(posts);
      } catch (error) {
        console.error(error);
      } finally {
        setState({ isLoading: false });
      }
    }
  }, [posts]); // eslint-disable-line

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


//==============================
// REDUX
//==============================

// MAP STATE TO PROPS
const mapStateToProps = (state) => ({
  posts: state.posts,
});

// MAP DISPATCH TO PROPS
const mapDispatchToProps = (dispatch) => ({
  dispatchSetPosts: (posts) => dispatch(actionCreators.setPosts(posts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
