import React from 'react';

// import './FeaturedPosts.scss';
import PostItem from '../../../shared/Components/PostItem/PostItem';

const FeaturedPosts = (props) => {
  return (
    <section data-component="FeaturedPosts" className="page-section">
      <div className="container">
        <h2 className="section-title">Featured posts</h2>

        <div className="row">
          {props.data.slice(0, 3).map((featuredPost, index) =>
            <React.Fragment key={featuredPost.id}>
              <div className="col-md-4">
                <PostItem data={featuredPost} />
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
