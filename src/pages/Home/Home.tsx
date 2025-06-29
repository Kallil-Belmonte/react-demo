import { type FunctionComponent, useEffect, useState } from 'react';

import { setPosts } from '@/core/redux/reducers/news';
import { getPosts } from '@/core/services';
import type { Post } from '@/core/services/news/types';
import { Loader } from '@/shared/components';
import { useDispatch, useSelector } from '@/shared/hooks';
import FeaturedPosts from './FeaturedPosts/FeaturedPosts';

const Home: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);

  const { posts } = useSelector(state => state.news);
  const dispatch = useDispatch();

  const getFeaturedPosts = async () => {
    if (posts.length) {
      const [firstPost, secondPost, thirdPost] = posts;
      setFeaturedPosts([firstPost, secondPost, thirdPost]);
    } else {
      setLoading(true);

      try {
        const posts = await getPosts();
        const [firstPost, secondPost, thirdPost] = posts;
        setFeaturedPosts([firstPost, secondPost, thirdPost]);
        dispatch(setPosts(posts));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    getFeaturedPosts();
  }, []); // eslint-disable-line

  return (
    <main data-page="Home">
      <Loader loading={loading} />
      <FeaturedPosts posts={featuredPosts} />
    </main>
  );
};

export default Home;
