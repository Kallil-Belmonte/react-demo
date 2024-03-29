import { FunctionComponent } from 'react';

import type { PostsProps } from '@/pages/News/Blog/_files/types';
import { PostItem } from '@/shared/components';

const { keys } = Object;

const Posts: FunctionComponent<PostsProps> = ({ currentPage, pages }) => {
  return (
    <section data-component="posts">
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
