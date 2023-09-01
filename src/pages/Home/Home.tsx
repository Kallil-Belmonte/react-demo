import { type FunctionComponent, useEffect } from 'react';

import type { HomeState } from '@/pages/Home/_files/types';
import { useSelector, useDispatch, useCustomState } from '@/shared/hooks';
import { setPosts } from '@/core/redux/reducers/news';
import { getPosts } from '@/core/services';
import { Loader } from '@/shared/components';
import FeaturedPosts from './FeaturedPosts/FeaturedPosts';

const initialState: HomeState = {
  loading: false,
  featuredPosts: [],
};

const Home: FunctionComponent = () => {
  const { posts } = useSelector(state => state.news);
  const dispatch = useDispatch();

  const [state, setState] = useCustomState<HomeState>(initialState);
  const { loading, featuredPosts } = state;

  const getFeaturedPosts = async () => {
    if (posts.length) {
      const [firstPost, secondPost, thirdPost] = posts;
      setState({ featuredPosts: [firstPost, secondPost, thirdPost] });
    } else {
      setState({ loading: true });

      try {
        const posts = await getPosts();
        const [firstPost, secondPost, thirdPost] = posts;
        setState({ featuredPosts: [firstPost, secondPost, thirdPost] });
        dispatch(setPosts(posts));
      } catch (error) {
        console.error(error);
      } finally {
        setState({ loading: false });
      }
    }
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    getFeaturedPosts();
  }, []);

  return (
    <main data-component="Home">
      <Loader loading={loading} />
      <FeaturedPosts posts={featuredPosts} />
    </main>
  );
};

export default Home;
