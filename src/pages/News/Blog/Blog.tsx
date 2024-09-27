import { type FunctionComponent, useState, useEffect } from 'react';

import type { Category, Post } from '@/core/services/news/types';
import { groupArrayItemsInArrays } from '@/shared/helpers';
import { useSelector, useDispatch } from '@/shared/hooks';
import { setCategories, setPosts } from '@/core/redux/reducers/news';
import { getCategories, getPosts } from '@/core/services';
import { Loader, PageHeader } from '@/shared/components';
import PostsPerPage from './PostsPerPage/PostsPerPage';
import Posts from './Posts/Posts';
import Pagination from './Pagination/Pagination';
import Categories from './Categories/Categories';
import './Blog.scss';

const { keys } = Object;

type Pages = { [key: string]: Post[] };

const Blog: FunctionComponent = () => {
  const { categories, posts } = useSelector(state => state.news);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<Pages>({});
  const [postsPerPage, setPostsPerPage] = useState(9);
  const [firstPaginationItem, setFirstPaginationItem] = useState(1);
  const [maxPaginationItem, setMaxPaginationItem] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const setPaginationSettings = (posts: Post[], quantPostsPerPage = 9) => {
    const pages: Pages = {};

    groupArrayItemsInArrays(posts, quantPostsPerPage).forEach((item, index) => {
      pages[index + 1] = item;
    });

    setPages(pages);
    setPostsPerPage(quantPostsPerPage);
    setFirstPaginationItem(1);
    setMaxPaginationItem(5);
    setCurrentPage(1);
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
      setLoading(false);
    }
  };

  const handleSelectCategory = async (category: Category['name']) => {
    setLoading(true);

    try {
      const response = await getPosts();
      dispatch(setPosts(response));
      setPaginationSettings(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaginate = (target: string) => {
    switch (target) {
      case 'previous':
        setFirstPaginationItem(firstPaginationItem - 1);
        break;

      case 'next':
        setFirstPaginationItem(firstPaginationItem + 1);
        break;

      default:
        setCurrentPage(Number(target));
    }
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    getAllData();
  }, []);

  return (
    <main data-page="Blog">
      <Loader loading={loading} />

      <div className="container">
        <PageHeader icon="Newspaper">Blog</PageHeader>

        <PostsPerPage
          postsPerPage={postsPerPage}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            setPaginationSettings(posts, Number(event.target.value))
          }
        />

        <div className="row">
          <div className="col-md-9">
            <Posts currentPage={currentPage} pages={pages} />

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
