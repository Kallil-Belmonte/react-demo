import React from 'react';

import './Home.css';
import axios, { ENDPOINTS } from '../../core/API/API';
import Layout from '../../layout/Layout';
import Loader from '../../shared/Components/Loader/Loader';
import FeaturedPosts from './FeaturedPosts/FeaturedPosts';

class Home extends React.Component {
  state = {
    loading: true,
    posts: []
  }

  componentDidMount() {
    this.getFeaturedPosts();
  }

  render() {
    return (
      <Layout>
        <main className="home-page">
          <Loader loading={this.state.loading} />

          <FeaturedPosts posts={this.state.posts} />
        </main>
      </Layout>
    );
  }


  //==============================
  // GENERAL METHODS
  //==============================

  // GET FEATURED POSTS
  getFeaturedPosts() {
    axios.get(ENDPOINTS.blog.posts).then(response => {
      this.setState((prevState, props) => {
        return {
          posts: response.data,
          loading: false
        };
      });
    });
  }
}

export default Home;
