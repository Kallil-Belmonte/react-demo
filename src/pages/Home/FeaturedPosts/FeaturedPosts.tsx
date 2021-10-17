import React from 'react';

import { Post } from '@/core/services/news/types';
import AppPostItem from '@/shared/components/AppPostItem/AppPostItem';

type Props = {
  posts: Post[];
};

const FeaturedPosts = ({ posts }: Props) => {
  return (
    <section data-component="FeaturedPosts" className="page-section">
      <div className="container">
        <h2 className="section-title">Featured posts</h2>

        <div className="row">
          {posts.map(post => (
            <div key={post.id} className="col-md-4">
              <AppPostItem post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;