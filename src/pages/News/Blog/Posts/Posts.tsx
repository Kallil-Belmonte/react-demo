import React from 'react';

import { PostsProps } from '@/pages/News/Blog/_files/types';
import { PostItem } from '@/shared/components';

const { keys } = Object;

const Posts = ({ pages, currentPage }: PostsProps) => {
  return (
    <section data-component="Posts">
      <div className="row">
        {!!keys(pages).length &&
          pages[currentPage].map(post => (
            <div key={post.id} className="col-md-4">
              <PostItem post={post} />
            </div>
          ))}
      </div>
    </section>
  );
};

export default Posts;
