import React from 'react';

// import './Posts.css';
import PostItem from '../../../../shared/Components/PostItem/PostItem';

const Posts = (props) => {
  return (
    <section id="posts">
      <div className="row">
        {props.posts.length > 0
          ? props.posts[props.currentPage].map((post, index) =>
              <div className="col-md-4" key={post.id}>
                <PostItem
                  id={post.id}
                  image={post.image}
                  title={post.title}
                  body={post.body}
                />
              </div>
            )
          : null}
      </div>
    </section>
  );
};

export default Posts;
