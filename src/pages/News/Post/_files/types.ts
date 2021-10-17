import { Post } from '@/core/services/news/types';

export type PostProps = {
  post: Post;
};

export type PostState = {
  isLoading: boolean;
};

export type DeletePostModalState = {
  isLoading: boolean;
};
