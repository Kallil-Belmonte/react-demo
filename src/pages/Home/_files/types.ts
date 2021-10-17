import { Post } from '@/core/services/news/types';

export type HomeState = {
  isLoading: boolean;
  featuredPosts: Post[];
};
