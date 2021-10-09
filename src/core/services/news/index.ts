import { JSON_PLACEHOLDER_URL, MOCKY_URL } from '@/core/services/_files/endpoints';
import { Category, Post } from './types';

const { stringify } = JSON;

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${MOCKY_URL}/bb4a0a50-d578-44e5-8d89-11ada2c96129`);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch(`${JSON_PLACEHOLDER_URL}/posts`);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getPost = async (id: string): Promise<Post> => {
  try {
    const response = await fetch(`${JSON_PLACEHOLDER_URL}/posts/${id}`);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const editPost = async (body: Post): Promise<Post> => {
  try {
    const response = await fetch(`${JSON_PLACEHOLDER_URL}/posts/${body.id}`, {
      method: 'PUT',
      body: stringify(body),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (id: string): Promise<Post> => {
  try {
    const response = await fetch(`${JSON_PLACEHOLDER_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
};
