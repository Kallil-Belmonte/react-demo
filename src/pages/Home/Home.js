import React, { useState, useEffect } from 'react';

import axios, { ENDPOINTS } from 'core/API/API';
import Dashboard from 'layout/Dashboard';
import Loader from 'shared/Components/Loader/Loader';
import FeaturedPosts from 'pages/Home/FeaturedPosts/FeaturedPosts';

const { blog } = ENDPOINTS;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);


  // GET FEATURED POSTS
  const getFeaturedPosts = async () => {
    try {
     const { data } = await axios.get(blog.posts);
     const [firstPost, secondPost, thirdPost] = data;
     setPosts([firstPost, secondPost, thirdPost])
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }


  // LIFECYCLE HOOKS
  useEffect(() => {
    getFeaturedPosts();
  }, []); // eslint-disable-line


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
