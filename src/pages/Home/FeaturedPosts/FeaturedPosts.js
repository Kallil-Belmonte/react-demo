import React from 'react';

// import './FeaturedPosts.css';
import PostItem from '../../../shared/Components/PostItem/PostItem';

const FeaturedPosts = (props) => {
  return (
    <section id="featured-posts" className="page-section">
      <div className="container">
        <h2 className="section-title">Featured posts</h2>

        <div className="row">
          {props.posts.slice(0, 3).map((post, index) =>
            <React.Fragment key={post.id}>
              <div className="col-md-4">
                <PostItem
                  id={post.id}
                  image={post.image}
                  title={post.title}
                  body={post.body}
                />
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
