import { Post } from '@/core/services/news/types';

export type FeaturedPostsProps = {
  posts: Post[];
};

export type HomeState = {
  loading: boolean;
  featuredPosts: Post[];
};
