import React from 'react';

// import './Home.scss';
import axios, { ENDPOINTS } from '../../core/API/API';
import Layout from '../../layout/Layout';
import Loader from '../../shared/Components/Loader/Loader';
import FeaturedPosts from './FeaturedPosts/FeaturedPosts';

class Home extends React.Component {
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
  getFeaturedPosts() {
    axios.get(ENDPOINTS.blog.posts)
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(error => {
        console.error(error);
      })
      .then(() => {
        // Deactivate loader
        this.setState({ loading: false });
      });
  }


  //==============================
  // VIEW
  //==============================

  render() {
    return (
      <Layout>
        <main data-component="Home">
          <Loader loading={this.state.loading} />

          <FeaturedPosts data={this.state.posts} />
        </main>
      </Layout>
    );
  }
}

export default Home;
