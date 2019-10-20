import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';

import axios, { MOCKY_INSTANCE, ENDPOINTS } from 'core/API/API';
import * as actionCreators from 'core/Redux/Actions/ActionCreators';
import * as Helpers from 'shared/Helpers';
import Dashboard from 'layout/Dashboard';
import Loader from 'shared/Components/Loader/Loader';
import PageHeader from 'shared/Components/PageHeader/PageHeader';
import PostsPerPage from 'pages/News/Blog/PostsPerPage/PostsPerPage';
import Posts from 'pages/News/Blog/Posts/Posts';
import BlogPagination from 'pages/News/Blog/BlogPagination/BlogPagination';
import Categories from 'pages/News/Blog/Categories/Categories';
import './Blog.scss';

class Blog extends Component {
  state = {
    loading: true,
    pages: {},
    postsPerPage: 9,
    firstPaginationItem: 1,
    maxPaginationItem: 5,
    currentPage: '1',
  }

  componentDidMount() {
    this.getAllData();
  }


  //==============================
  // GENERAL METHODS
  //==============================

  // SET PAGINATION SETTINGS
  setPaginationSettings(posts, quantPostsPerPage) {
    const pages = {};
    const postsPerPage = quantPostsPerPage || 9;

    Helpers.groupArrayItems(posts, postsPerPage).forEach((item, index) => {
      pages[index + 1] = item;
    });

    this.setState({
      pages,
      postsPerPage,
      firstPaginationItem: 1,
      maxPaginationItem: 5,
      currentPage: '1',
    });
  }


  // GET CATEGORIES
  getCategories() {
    return MOCKY_INSTANCE.get(ENDPOINTS.blog.categories).then(response => response.data);
  }


  // GET POSTS
  getPosts() {
    return axios.get(ENDPOINTS.blog.posts).then(response => response.data);
  }


  // GET ALL DATA
  getAllData() {
    Promise.all([
      this.getCategories(),
      this.getPosts(),
    ])
    .then(([categories, posts]) => {
      // Handle set data
      this.props.handleSetPosts(posts);
      this.props.handleSetCategories(categories);

      // Set Pagination Settings
      this.setPaginationSettings(posts);
    })
    .catch((error) => {
      console.error(error);
    })
    .then(() => {
      // Deactivate loader
      this.setState({ loading: false });
    });
  }


  // HANDLE SELECT CATEGORY
  handleSelectCategory(category) {
    // Activate loader
    this.setState({ loading: true });

    // Get posts from the selected category
    axios.get(ENDPOINTS.blog.posts)
      .then(response => {
        // Handle set posts
        this.props.handleSetPosts(response.data);

        // Set Pagination Settings
        this.setPaginationSettings(response.data);

        // Deactivate loader
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.error(error);

        // Deactivate loader
        this.setState({ loading: false });
      });
  }


  // HANDLE PAGINATE
  handlePaginate(target) {
    switch(target) {
      case 'previous':
        this.setState((prevState) => ({
          firstPaginationItem: --prevState.firstPaginationItem
        }));
        break;

      case 'next':
        this.setState((prevState) => ({
          firstPaginationItem: ++prevState.firstPaginationItem
        }));
        break;

      default:
        this.setState({ currentPage: target })

    }
  }


  //==============================
  // VIEW
  //==============================

  render() {
    const { posts, categories } = this.props;
    const {
      loading,
      pages,
      postsPerPage,
      firstPaginationItem,
      maxPaginationItem,
      currentPage,
    } = this.state;

    return (
      <Dashboard>
        <main data-component="Blog">
          <Loader loading={loading} />

          <Container>
            <PageHeader title="Blog" icon="newspaper" />

            <PostsPerPage
              postsPerPage={postsPerPage}
              onChange={(value) => this.setPaginationSettings(posts, value)}
            />

            <Row>
              <Col md={9}>
                <Posts pages={pages} currentPage={currentPage} />

                <BlogPagination
                  pages={Object.keys(pages)}
                  firstItem={firstPaginationItem}
                  maxItem={maxPaginationItem}
                  currentPage={currentPage}
                  onPaginate={(target) => this.handlePaginate(target)}
                />
              </Col>
              <Col md={3}>
                <Categories
                  categories={categories}
                  onSelectCategory={(category) => this.handleSelectCategory(category)}
                />
              </Col>
            </Row>
          </Container>
        </main>
      </Dashboard>
    );
  }
}


//==============================
// REDUX
//==============================

// MAP STATE TO PROPS
const mapStateToProps = (state) => ({
  posts: state.posts,
  categories: state.categories,
});

// MAP DISPATCH TO PROPS
const mapDispatchToProps = (dispatch) => ({
  handleSetPosts: (posts) => dispatch(actionCreators.setPosts(posts)),
  handleSetCategories: (categories) => dispatch(actionCreators.setCategories(categories)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
