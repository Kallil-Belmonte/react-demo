import React, { useReducer, useCallback, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import axios, { MOCKY_INSTANCE, ENDPOINTS } from 'core/api';
import State from 'core/hooks/State';
import { setCategories, setPosts } from 'core/redux/reducers/blog';
import { groupArrayItemsInArrays } from 'shared/helpers';
import Dashboard from 'layout/Dashboard';
import Loader from 'shared/components/Loader/Loader';
import PageHeader from 'shared/components/PageHeader/PageHeader';
import PostsPerPage from 'pages/News/Blog/PostsPerPage/PostsPerPage';
import Posts from 'pages/News/Blog/Posts/Posts';
import BlogPagination from 'pages/News/Blog/BlogPagination/BlogPagination';
import Categories from 'pages/News/Blog/Categories/Categories';
import './Blog.scss';

const { keys } = Object;
const { blog } = ENDPOINTS;

const initialState = {
  isLoading: true,
  pages: {},
  postsPerPage: 9,
  firstPaginationItem: 1,
  maxPaginationItem: 5,
  currentPage: 1,
};

const Blog = () => {
  const { categories, posts } = useSelector(state => state.blog);
  const dispatch = useDispatch();
  const [state, setState] = useReducer(State, initialState);
  const { isLoading, pages, postsPerPage, firstPaginationItem, maxPaginationItem, currentPage } =
    state;

  const setPaginationSettings = useCallback((posts, quantPostsPerPage = 9) => {
    const pages = {};

    groupArrayItemsInArrays(posts, quantPostsPerPage).forEach((item, index) => {
      pages[index + 1] = item;
    });

    setState({
      pages,
      postsPerPage: quantPostsPerPage,
      firstPaginationItem: 1,
      maxPaginationItem: 5,
      currentPage: 1,
    });
  }, []);

  const getAllData = useCallback(async () => {
    try {
      if (!categories.length) {
        const { data } = await MOCKY_INSTANCE.get(blog.categories);
        dispatch(setCategories(data));
      }

      if (!posts.length) {
        const { data: posts } = await axios.get(blog.posts);
        dispatch(setPosts(posts));
      }

      setPaginationSettings(posts);
    } catch (error) {
      console.error(error);
    } finally {
      setState({ isLoading: false });
    }
  }, [categories, dispatch, posts, setPaginationSettings]);

  const handleSelectCategory = useCallback(
    async (/* category */) => {
      setState({ isLoading: true });

      try {
        const { data: posts } = await axios.get(blog.posts);

        dispatch(setPosts(posts));
        setPaginationSettings(posts);
      } catch (error) {
        console.error(error);
      } finally {
        setState({ isLoading: false });
      }
    },
    [dispatch, setPaginationSettings],
  );

  const handlePaginate = useCallback(
    target => {
      switch (target) {
        case 'previous':
          setState({ firstPaginationItem: firstPaginationItem - 1 });
          break;

        case 'next':
          setState({ firstPaginationItem: firstPaginationItem + 1 });
          break;

        default:
          setState({ currentPage: Number(target) });
      }
    },
    [firstPaginationItem],
  );

  // LIFECYCLE HOOKS
  useEffect(() => {
    getAllData();
  }, []); // eslint-disable-line

  return (
    <Dashboard>
      <main data-component="Blog">
        <Loader isLoading={isLoading} />

        <Container>
          <PageHeader title="Blog" icon="newspaper" />

          <PostsPerPage
            postsPerPage={postsPerPage}
            onChange={value => setPaginationSettings(posts, value)}
          />

          <Row>
            <Col md={9}>
              <Posts pages={pages} currentPage={currentPage} />

              <BlogPagination
                pages={keys(pages)}
                firstItem={firstPaginationItem}
                maxItem={maxPaginationItem}
                currentPage={currentPage}
                onPaginate={target => handlePaginate(target)}
              />
            </Col>
            <Col md={3}>
              <Categories
                categories={categories}
                onSelectCategory={category => handleSelectCategory(category)}
              />
            </Col>
          </Row>
        </Container>
      </main>
    </Dashboard>
  );
};

export default Blog;
