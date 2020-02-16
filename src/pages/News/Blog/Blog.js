import React, { useState, useEffect } from 'react';
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

const { blog } = ENDPOINTS;

const Blog = ({ categories, posts, handleSetCategories, handleSetPosts }) => {
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState({});
  const [postsPerPage, setPostsPerPage] = useState(9);
  const [firstPaginationItem, setFirstPaginationItem] = useState(1);
  const [maxPaginationItem, setMaxPaginationItem] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);


  // SET PAGINATION SETTINGS
  const setPaginationSettings = (posts, quantPostsPerPage) => {
    const pagesValue = {};
    const postsPerPageValue = quantPostsPerPage || 9;

    Helpers.groupArrayItemsInArrays(posts, postsPerPageValue).forEach((item, index) => {
      pagesValue[index + 1] = item;
    });

    setPages(pagesValue);
    setPostsPerPage(postsPerPageValue);
    setFirstPaginationItem(1);
    setMaxPaginationItem(5);
    setCurrentPage(1);
  };


  // GET ALL DATA
  const getAllData = async () => {
    try {
      const categoriesResponse = await MOCKY_INSTANCE.get(blog.categories);
      const postsResponse = await axios.get(blog.posts);

      handleSetCategories(categoriesResponse.data);
      handleSetPosts(postsResponse.data);
      setPaginationSettings(postsResponse.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  // HANDLE SELECT CATEGORY
  const handleSelectCategory = async (category) => {
    setLoading(true);

    try {
      const response = await axios.get(blog.posts);

      handleSetPosts(response.data);
      setPaginationSettings(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  // HANDLE PAGINATE
  const handlePaginate = (target) => {
    switch(target) {
      case 'previous':
        setFirstPaginationItem(firstPaginationItem - 1);
        break;

      case 'next':
        setFirstPaginationItem(firstPaginationItem + 1)
        break;

      default:
        setCurrentPage(target);
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
  handleSetCategories: (categories) => dispatch(actionCreators.setCategories(categories)),
  handleSetPosts: (posts) => dispatch(actionCreators.setPosts(posts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
