import { type FunctionComponent, useEffect, useState } from 'react';

import { setCategories, setPosts } from '@/core/redux/reducers/news';
import { getCategories, getPosts } from '@/core/services';
import type { Category, Post } from '@/core/services/news/types';
import { Loader, PageHeader, Select } from '@/shared/components';
import { groupArrayItemsInArrays } from '@/shared/helpers';
import { useDispatch, useField, useSelector } from '@/shared/hooks';
import './Blog.scss';
import Categories from './Categories/Categories';
import Pagination from './Pagination/Pagination';
import Posts from './Posts/Posts';

const { keys } = Object;

type Pages = { [key: string]: Post[] };

const Blog: FunctionComponent = () => {
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<Pages>({});
  const [firstPaginationItem, setFirstPaginationItem] = useState(1);
  const [maxPaginationItem, setMaxPaginationItem] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const { categories, posts } = useSelector(state => state.news);
  const dispatch = useDispatch();

  const postsPerPage = useField({ defaultValue: '9' });

  const setPaginationSettings = (posts: Post[], quantPostsPerPage = 9) => {
    const pages: Pages = {};

    groupArrayItemsInArrays(posts, quantPostsPerPage).forEach((item, index) => {
      pages[index + 1] = item;
    });

    setPages(pages);
    setFirstPaginationItem(1);
    setMaxPaginationItem(5);
    setCurrentPage(1);
    postsPerPage.setValue(String(quantPostsPerPage));
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

  const handleSelectCategory = async (_category: Category['name']) => {
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
  }, []); // eslint-disable-line

  return (
    <main data-page="Blog">
      <Loader loading={loading} />

      <div className="container">
        <PageHeader icon="Newspaper">Blog</PageHeader>

        <Select
          label="Posts per page:"
          name="posts-per-page"
          field={postsPerPage}
          options={[
            { text: '9', value: '9' },
            { text: '18', value: '18' },
            { text: '27', value: '27' },
            { text: '36', value: '36' },
          ]}
          onChange={(value: string) => setPaginationSettings(posts, Number(value))}
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
