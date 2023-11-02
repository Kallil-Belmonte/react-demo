import request from '@/core/services/_files/request';
import type { Category, Post } from './types';

const { stringify } = JSON;

export const getCategories = (): Promise<Category[]> =>
  request(`697df6c0-f63e-4d91-baec-e5209c24cb64`);

export const getPosts = (): Promise<Post[]> => request(`posts`, undefined, 'jsonPlaceholder');

export const getPost = (id: string): Promise<Post> =>
  request(`posts/${id}`, undefined, 'jsonPlaceholder');

export const editPost = (body: Post): Promise<Post> =>
  request(
    `posts/${body.id}`,
    {
      method: 'PUT',
      body: stringify(body),
    },
    'jsonPlaceholder',
  );

export const deletePost = (id: string): Promise<Post> =>
  request(
    `posts/${id}`,
    {
      method: 'DELETE',
    },
    'jsonPlaceholder',
  );
