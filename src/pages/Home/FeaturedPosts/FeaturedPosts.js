import React, { Fragment } from 'react';

import PostItem from 'shared/Components/PostItem/PostItem';

const FeaturedPosts = ({ data }) => {
  return (
    <section data-component="FeaturedPosts" className="page-section">
      <div className="container">
        <h2 className="section-title">Featured posts</h2>

        <div className="row">
          {data.slice(0, 3).map((featuredPost, index) =>
            <Fragment key={featuredPost.id}>
              <div className="col-md-4">
                <PostItem data={featuredPost} />
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
