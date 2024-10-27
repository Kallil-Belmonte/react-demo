import request from '@/core/services/_files/request';
import type { Category, Post } from './types';

const { stringify } = JSON;

export const getCategories = async (): Promise<Category[]> => [
  {
    name: 'HTML',
    posts: 5,
  },
  {
    name: 'CSS',
    posts: 5,
  },
  {
    name: 'JavaScript',
    posts: 5,
  },
];

export const getPosts = (): Promise<Post[]> => request({ url: 'posts', api: 'jsonPlaceholder' });

export const getPost = (id: string): Promise<Post> =>
  request({ url: `posts/${id}`, api: 'jsonPlaceholder' });

export const editPost = (body: Post): Promise<Post> =>
  request({
    url: `posts/${body.id}`,
    init: {
      method: 'PUT',
      body: stringify(body),
    },
    api: 'jsonPlaceholder',
  });

export const deletePost = (id: string): Promise<Post> =>
  request({
    url: `posts/${id}`,
    init: {
      method: 'DELETE',
    },
    api: 'jsonPlaceholder',
  });
