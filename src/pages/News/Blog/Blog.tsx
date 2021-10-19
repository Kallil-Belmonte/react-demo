import React, { useEffect } from 'react';

import { Category, Post } from '@/core/services/news/types';
import { BlogState } from '@/pages/News/Blog/_files/types';
import { groupArrayItemsInArrays } from '@/shared/helpers';
import { useAppSelector, useAppDispatch, useCustomState } from '@/shared/hooks';
import { setCategories, setPosts } from '@/core/redux/reducers/news';
import { getCategories, getPosts } from '@/core/services';
import { AppLoader, AppPageHeader } from '@/shared/components';
import PostsPerPage from './PostsPerPage/PostsPerPage';
import Posts from './Posts/Posts';
import Pagination from './Pagination/Pagination';
import Categories from './Categories/Categories';
import './Blog.scss';

const { keys } = Object;

const initialState: BlogState = {
  isLoading: true,
  pages: {},
  postsPerPage: 9,
  firstPaginationItem: 1,
  maxPaginationItem: 5,
  currentPage: 1,
};

const Blog = () => {
  const { categories, posts } = useAppSelector(state => state.news);
  const dispatch = useAppDispatch();

  const [state, setState] = useCustomState<BlogState>(initialState);
  const { isLoading, pages, postsPerPage, firstPaginationItem, maxPaginationItem, currentPage } =
    state;

  const setPaginationSettings = (posts: Post[], quantPostsPerPage = 9) => {
    const pages: BlogState['pages'] = {};

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
  };

  const getAllData = async () => {
    try {
      if (!categories.length) {
        const response = await getCategories();
        dispatch(setCategories(response));
      }

      if (!posts.length) {
        const response = await getPosts();
        dispatch(setPosts(response));
      }

      setPaginationSettings(posts);
    } catch (error) {
      console.error(error);
    } finally {
      setState({ isLoading: false });
    }
  };

  const handleSelectCategory = async (category: Category['name']) => {
    console.log(category);
    setState({ isLoading: true });

    try {
      const response = await getPosts();
      dispatch(setPosts(response));
      setPaginationSettings(response);
    } catch (error) {
      console.error(error);
    } finally {
      setState({ isLoading: false });
    }
  };

  const handlePaginate = (target: string) => {
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
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    getAllData();
  }, []);

  return (
    <main data-component="Blog">
      <AppLoader isLoading={isLoading} />

      <div className="container">
        <AppPageHeader icon="Newspaper">Blog</AppPageHeader>

        <PostsPerPage
          postsPerPage={postsPerPage}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            setPaginationSettings(posts, Number(event.target.value))
          }
        />

        <div className="row">
          <div className="col-md-9">
            <Posts pages={pages} currentPage={currentPage} />

            <Pagination
              pages={keys(pages)}
              firstItem={firstPaginationItem}
              maxItem={maxPaginationItem}
              currentPage={currentPage}
              onPaginate={target => handlePaginate(target)}
            />
          </div>
          <div className="col-md-3">
            <Categories
              categories={categories}
              onSelectCategory={(category: Category['name']) => handleSelectCategory(category)}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Blog;
