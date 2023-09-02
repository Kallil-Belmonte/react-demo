import type { FunctionComponent } from 'react';

import type { FeaturedPostsProps } from '@/pages/Home/_files/types';
import { PostItem } from '@/shared/components';

const FeaturedPosts: FunctionComponent<FeaturedPostsProps> = ({ posts }) => {
  return (
    <section data-component="featured-posts" className="page-section">
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
