import React from 'react';
import { connect } from 'react-redux';

import './Blog.scss';
import axios, { MOCKY_INSTANCE, ENDPOINTS } from '../../../core/API/API';
import * as actionCreators from '../../../core/Redux/Actions/ActionCreators';
import Utils from '../../../shared/General/Utils';
import Layout from '../../../layout/Layout';
import Loader from '../../../shared/Components/Loader/Loader';
import PageHeader from '../../../shared/Components/PageHeader/PageHeader';
import PostsFilter from './PostsFilter/PostsFilter';
import Posts from './Posts/Posts';
import Pagination from './Pagination/Pagination';
import Categories from './Categories/Categories';

class Blog extends React.Component {
  state = {
    loading: true,
    postsPerPage: 9,
    pagePosts: [],
    currentPage: 0,
    firstPaginationItem: 1,
  }

  componentDidMount() {
    this.getAllData();
  }

  render() {
    return (
      <Layout>
        <main data-component="Blog">
          <Loader loading={this.state.loading} />

          <div className="container">
            <PageHeader title="Blog" icon="newspaper" />

            <PostsFilter change={(event) => this.handleFilterPosts(event)} />

            <div className="row">
              <div className="col-md-9">
                <Posts data={this.state.pagePosts} currentPage={this.state.currentPage} />

                <Pagination
                  firstItem={this.state.firstPaginationItem}
                  totalItems={this.state.pagePosts.length}
                  paginate={(event) => this.handlePaginate(event)} />
              </div>
              <div className="col-md-3">
                <Categories data={this.props.categories} click={(event) => this.handleSelectCategory(event)} />
              </div>
            </div>
          </div>
        </main>
      </Layout>
    );
  }


  //==============================
  // GENERAL METHODS
  //==============================

  // RESET PAGINATION
  resetPagination() {
    // Remove active class
    if (document.querySelector('.page-item.active')) document.querySelector('.page-item.active').classList.remove('active');

    // Add active class
    if (document.querySelector('.page-item .page-link:first-child').innerText !== 'Previous') {
      document.querySelector('.page-item:nth-child(1)').classList.add('active');
    } else {
      document.querySelector('.page-item:nth-child(2)').classList.add('active');
    }
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

      // Set Page Posts
      this.setState({
        pagePosts: Utils.groupArrayItems(posts, this.state.postsPerPage),
      });
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
    for (let item of document.querySelectorAll('.list-group-item')) {
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
      pagePosts: [],
    });

    // Get posts from the selected category
    // const category = document.querySelector('.list-group-item.active').getAttribute('data-name');
    axios.get(ENDPOINTS.blog.posts)
      .then(response => {
        // Handle set posts
        this.props.handleSetPosts(response.data);

        // Reset pagination
        this.resetPagination();

        // Set page settings
        this.setState({
          loading: false,
          pagePosts: Utils.groupArrayItems(response.data, this.state.postsPerPage),
          currentPage: 0,
          firstPaginationItem: 1,
        });
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
    this.resetPagination();

    // Set page settings
    this.setState({
      postsPerPage: +event.target.value,
      pagePosts: Utils.groupArrayItems(this.props.posts, +event.target.value),
      currentPage: 0,
      firstPaginationItem: 1,
    });
  }


  // HANDLE PAGINATE
  handlePaginate(event) {
    event.persist();

    // Select active page item
    const activePageItem = document.querySelector('.page-item.active');

    // Navigate back and forth
    const navigateBackAndForth = (back) => {
      if (activePageItem) activePageItem.classList.remove('active');

      for (let item of document.querySelectorAll('.page-item .page-link')) {
        if (back) {
          if (+item.innerText === this.state.currentPage + 2) item.parentNode.classList.add('active');
        } else {
          if (+item.innerText === this.state.currentPage) item.parentNode.classList.add('active');
        }
      }

      this.setState((prevState, props) => ({
        firstPaginationItem: back ? prevState.firstPaginationItem - 1 : prevState.firstPaginationItem + 1,
      }));
    };

    // Update current page
    switch(event.target.innerText) {
      case 'Previous':
        navigateBackAndForth(true);
        break;

      case 'Next':
        navigateBackAndForth(false);
        break;

      default:
        if (activePageItem) activePageItem.classList.remove('active');
        event.target.parentNode.classList.add('active');
        this.setState({ currentPage: +event.target.innerText - 1 });
    }
  }
}


//==============================
// REDUX
//==============================

// MAP STATE TO PROPS
const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    categories: state.categories,
  };
};

// MAP DISPATCH TO PROPS
const mapDispatchToProps = (dispatch) => {
  return {
    handleSetPosts: (posts) => dispatch(actionCreators.setPosts(posts)),
    handleSetCategories: (categories) => dispatch(actionCreators.setCategories(categories)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
