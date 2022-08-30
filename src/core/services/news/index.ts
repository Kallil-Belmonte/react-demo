import { JSON_PLACEHOLDER_URL, MOCKY_URL } from '@/core/services/_files/endpoints';
import request from '@/core/services/_files/request';
import { Category, Post } from './types';

const { stringify } = JSON;

export const getCategories = async (): Promise<Category[]> =>
  request(() => fetch(`${MOCKY_URL}/bb4a0a50-d578-44e5-8d89-11ada2c96129`));

export const getPosts = async (): Promise<Post[]> =>
  request(() => fetch(`${JSON_PLACEHOLDER_URL}/posts`));

export const getPost = async (id: string): Promise<Post> =>
  request(() => fetch(`${JSON_PLACEHOLDER_URL}/posts/${id}`));

export const editPost = async (body: Post): Promise<Post> =>
  request(() =>
    fetch(`${JSON_PLACEHOLDER_URL}/posts/${body.id}`, {
      method: 'PUT',
      body: stringify(body),
    }),
  );

export const deletePost = async (id: string): Promise<Post> =>
  request(() =>
    fetch(`${JSON_PLACEHOLDER_URL}/posts/${id}`, {
      method: 'DELETE',
    }),
  );
