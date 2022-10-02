import { Category, Post } from '@/core/services/news/types';

export type CategoriesProps = {
  categories: Category[];
  onSelectCategory: (category: Category['name']) => void;
};

export type CategoriesState = {
  activeCategory: Category['name'];
};

export type PaginationProps = {
  pages: string[];
  firstItem: number;
  maxItem: number;
  currentPage: number;
  onPaginate: (target: string) => void;
};

export type PostsProps = {
  pages: { [key: string]: Post[] };
  currentPage: number;
};

export type PostsPerPageProps = {
  postsPerPage: number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export type BlogState = {
  loading: boolean;
  pages: { [key: string]: Post[] };
  postsPerPage: number;
  firstPaginationItem: number;
  maxPaginationItem: number;
  currentPage: number;
};
