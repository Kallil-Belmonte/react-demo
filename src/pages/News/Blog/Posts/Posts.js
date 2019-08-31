import React from 'react';

import PostItem from '../../../../shared/Components/PostItem/PostItem';

const Posts = (props) => {
  return (
    <section data-component="Posts">
      <div className="row">
        {props.data.length
          ? props.data[props.currentPage].map((post, index) =>
              <div className="col-md-4" key={post.id}>
                <PostItem data={post} />
              </div>
            )
          : null}
      </div>
    </section>
  );
};

export default Posts;
