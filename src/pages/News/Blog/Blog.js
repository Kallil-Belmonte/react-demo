import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';

import axios, { MOCKY_INSTANCE, ENDPOINTS } from 'core/API/API';
import * as actionCreators from 'core/Redux/Actions/ActionCreators';
import * as Helpers from 'shared/Helpers';
import Dashboard from 'layout/Dashboard';
import Loader from 'shared/Components/Loader/Loader';
import PageHeader from 'shared/Components/PageHeader/PageHeader';
import PostsFilter from 'pages/News/Blog/PostsFilter/PostsFilter';
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
    currentPage: 1,
  }

  componentDidMount() {
    this.getAllData();
  }


  //==============================
  // GENERAL METHODS
  //==============================

  // RESET PAGINATION
  // resetPagination() {
  //   // Remove active class
  //   if (document.querySelector('.page-item.active')) document.querySelector('.page-item.active').classList.remove('active');
  //
  //   // Add active class
  //   if (document.querySelector('.page-item .page-link:first-child').innerText !== 'Previous') {
  //     document.querySelector('.page-item:nth-child(1)').classList.add('active');
  //   } else {
  //     document.querySelector('.page-item:nth-child(2)').classList.add('active');
  //   }
  // }


  // SET PAGINATION SETTINGS
  setPaginationSettings(posts) {
    if (posts) {
      const pages = {};
      Helpers.groupArrayItems(posts, this.state.postsPerPage).forEach((item, index) => {
        pages[index + 1] = item;
      });

      this.setState({ pages });
    }

    this.setState({
      firstPaginationItem: 1,
      maxPaginationItem: 5,
      currentPage: 1,
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
  handleSelectCategory(event) {
    // Remove active class
    for (const item of document.querySelectorAll('.list-group-item')) {
      item.classList.remove('active');
    }

    // Add active class
    if (event.target.tagName === 'SPAN') {
      event.target.parentNode.classList.add('active');
    } else {
      event.target.classList.add('active');
    }

    // Reset posts page
    this.setState({
      loading: true,
      pages: [],
    });

    // Get posts from the selected category
    // const category = document.querySelector('.list-group-item.active').getAttribute('data-name');
    axios.get(ENDPOINTS.blog.posts)
      .then(response => {
        // Handle set posts
        this.props.handleSetPosts(response.data);

        // Reset pagination
        // this.resetPagination();

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


  // HANDLE FILTER POSTS
  handleFilterPosts(event) {
    event.persist();

    // Reset pagination
    // this.resetPagination();

    // Set Pagination Settings
    this.setPaginationSettings();

    // Set Posts Per Page
    this.setState({ postsPerPage: +event.target.value });
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
        console.log('Fazer');

    }

    // event.persist();

    // // Select active page item
    // const activePageItem = document.querySelector('.page-item.active');
    //
    // // Navigate back and forth
    // const navigateBackAndForth = (back) => {
    //   if (activePageItem) activePageItem.classList.remove('active');
    //
    //   for (const item of document.querySelectorAll('.page-item .page-link')) {
    //     if (back) {
    //       if (parseInt(item.innerText) === this.state.currentPage + 2) item.parentNode.classList.add('active');
    //     } else {
    //       if (parseInt(item.innerText) === this.state.currentPage) item.parentNode.classList.add('active');
    //     }
    //   }
    //
    //   this.setState((prevState, props) => ({
    //     firstPaginationItem: back ? prevState.firstPaginationItem - 1 : prevState.firstPaginationItem + 1,
    //   }));
    // };
    //
    // // Update current page
    // switch(event.target.innerText) {
    //   case 'Previous':
    //     navigateBackAndForth(true);
    //     break;
    //
    //   case 'Next':
    //     navigateBackAndForth(false);
    //     break;
    //
    //   default:
    //     if (activePageItem) activePageItem.classList.remove('active');
    //     event.target.parentNode.classList.add('active');
    //     this.setState({ currentPage: parseInt(event.target.innerText) - 1 });
    // }
  }


  //==============================
  // VIEW
  //==============================

  render() {
    const { categories } = this.props;
    const { loading, pages, firstPaginationItem, maxPaginationItem, currentPage } = this.state;

    return (
      <Dashboard>
        <main data-component="Blog">
          <Loader loading={loading} />

          <Container>
            <PageHeader title="Blog" icon="newspaper" />

            <PostsFilter onChange={(event) => this.handleFilterPosts(event)} />

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
                <Categories categories={categories} onClick={(event) => this.handleSelectCategory(event)} />
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
