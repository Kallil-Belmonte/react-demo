import { Post } from '@/core/services/news/types';

export type FeaturedPostsProps = {
  posts: Post[];
};

export type HomeState = {
  isLoading: boolean;
  featuredPosts: Post[];
};
