import { FunctionComponent } from 'react';

import type { Post } from '@/core/services/news/types';
import { PostItem } from '@/shared/components';

const { keys } = Object;

type Props = {
  pages: { [key: string]: Post[] };
  currentPage: number;
};

const Posts: FunctionComponent<Props> = ({ currentPage, pages }) => {
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
