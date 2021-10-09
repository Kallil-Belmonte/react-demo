export type Category = {
  name: string;
  posts: number;
};

export type Post = {
  userId: number;
  id: number;
  image?: string;
  title: string;
  body: string;
};
