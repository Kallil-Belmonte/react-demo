import React, { Component } from 'react';

import axios, { ENDPOINTS } from 'core/API/API';
import Dashboard from 'layout/Dashboard';
import Loader from 'shared/Components/Loader/Loader';
import FeaturedPosts from 'pages/Home/FeaturedPosts/FeaturedPosts';

class Home extends Component {
  state = {
    loading: true,
    posts: [],
  }

  componentDidMount() {
    this.getFeaturedPosts();
  }


  //==============================
  // GENERAL METHODS
  //==============================

  // GET FEATURED POSTS
  async getFeaturedPosts() {
    try {
     const response = await axios.get(ENDPOINTS.blog.posts);
     this.setState({ posts: response.data });
    } catch (error) {
      throw error;
    } finally {
      this.setState({ loading: false });
    }
  }


  //==============================
  // VIEW
  //==============================

  render() {
    const { loading, posts } = this.state;

    return (
      <Dashboard>
        <main data-component="Home">
          <Loader loading={loading} />

          <FeaturedPosts posts={posts} />
        </main>
      </Dashboard>
    );
  }
}

export default Home;
