import type { FunctionComponent } from 'react';

import type { Post } from '@/core/services/news/types';
import { PostItem } from '@/shared/components';

type Props = {
  posts: Post[];
};

const FeaturedPosts: FunctionComponent<Props> = ({ posts }) => {
  return (
    <section data-component="FeaturedPosts" className="page-section">
      <div className="container">
        <h2 className="section-title">Featured posts</h2>

        <div className="row">
          {posts.map(post => (
            <div key={post.id} className="col-md-4">
              <PostItem post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
