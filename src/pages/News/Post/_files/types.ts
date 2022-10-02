import { Post } from '@/core/services/news/types';

export type PostProps = {
  post: Post;
};

export type PostState = {
  loading: boolean;
};

export type DeletePostModalState = {
  loading: boolean;
};
