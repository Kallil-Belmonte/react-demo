import request from '@/core/services/_files/request';
import { Category, Post } from './types';

const { stringify } = JSON;

export const getCategories = async (): Promise<Category[]> =>
  request(`bb4a0a50-d578-44e5-8d89-11ada2c96129`);

export const getPosts = async (): Promise<Post[]> => request(`posts`, undefined, 'jsonPlaceholder');

export const getPost = async (id: string): Promise<Post> =>
  request(`posts/${id}`, undefined, 'jsonPlaceholder');

export const editPost = async (body: Post): Promise<Post> =>
  request(
    `posts/${body.id}`,
    {
      method: 'PUT',
      body: stringify(body),
    },
    'jsonPlaceholder',
  );

export const deletePost = async (id: string): Promise<Post> =>
  request(
    `posts/${id}`,
    {
      method: 'DELETE',
    },
    'jsonPlaceholder',
  );
