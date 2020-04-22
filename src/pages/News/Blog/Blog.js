import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';

import axios, { MOCKY_INSTANCE, ENDPOINTS } from 'core/API/API';
import Reducer from 'core/Hooks/Reducer';
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

const { blog } = ENDPOINTS;
const { groupArrayItemsInArrays } = Helpers;

const initialState = {
  loading: true,
  pages: {},
  postsPerPage: 9,
  firstPaginationItem: 1,
  maxPaginationItem: 5,
  currentPage: 1,
};

const Blog = ({ categories, posts, dispatchSetCategories, dispatchSetPosts }) => {
  const [state, setState] = useReducer(Reducer, initialState);

  const {
    loading,
    pages,
    postsPerPage,
    firstPaginationItem,
    maxPaginationItem,
    currentPage,
  } = state;

  // SET PAGINATION SETTINGS
  const setPaginationSettings = (posts, quantPostsPerPage) => {
    const pages = {};
    const postsPerPage = quantPostsPerPage || 9;

    groupArrayItemsInArrays(posts, postsPerPage).forEach((item, index) => {
      pages[index + 1] = item;
    });

    setState({
      pages,
      postsPerPage,
      firstPaginationItem: 1,
      maxPaginationItem: 5,
      currentPage: 1,
    });
  };

  // GET ALL DATA
  const getAllData = async () => {
    try {
      const categoriesResponse = await MOCKY_INSTANCE.get(blog.categories);
      const postsResponse = await axios.get(blog.posts);

      dispatchSetCategories(categoriesResponse.data);
      dispatchSetPosts(postsResponse.data);
      setPaginationSettings(postsResponse.data);
    } catch (error) {
      console.error(error);
    } finally {
      setState({ loading: false });
    }
  };

  // HANDLE SELECT CATEGORY
  const handleSelectCategory = async (category) => {
    setState({ loading: true });

    try {
      const { data } = await axios.get(blog.posts);

      dispatchSetPosts(data);
      setPaginationSettings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setState({ loading: false });
    }
  };

  // HANDLE PAGINATE
  const handlePaginate = (target) => {
    switch(target) {
      case 'previous':
        setState({ firstPaginationItem: firstPaginationItem - 1 });
        break;

      case 'next':
        setState({ firstPaginationItem: firstPaginationItem + 1 })
        break;

      default:
        setState({ currentPage: target });
    }
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    getAllData();
  }, []); // eslint-disable-line

  return (
    <Dashboard>
      <main data-component="Blog">
        <Loader loading={loading} />

        <Container>
          <PageHeader title="Blog" icon="newspaper" />

          <PostsPerPage
            postsPerPage={postsPerPage}
            onChange={(value) => setPaginationSettings(posts, value)}
          />

          <Row>
            <Col md={9}>
              <Posts pages={pages} currentPage={currentPage} />

              <BlogPagination
                pages={Object.keys(pages)}
                firstItem={firstPaginationItem}
                maxItem={maxPaginationItem}
                currentPage={currentPage}
                onPaginate={(target) => handlePaginate(target)}
              />
            </Col>
            <Col md={3}>
              <Categories
                categories={categories}
                onSelectCategory={(category) => handleSelectCategory(category)}
              />
            </Col>
          </Row>
        </Container>
      </main>
    </Dashboard>
  );
};


//==============================
// REDUX
//==============================

// MAP STATE TO PROPS
const mapStateToProps = (state) => ({
  categories: state.categories,
  posts: state.posts,
});

// MAP DISPATCH TO PROPS
const mapDispatchToProps = (dispatch) => ({
  dispatchSetCategories: (categories) => dispatch(actionCreators.setCategories(categories)),
  dispatchSetPosts: (posts) => dispatch(actionCreators.setPosts(posts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
