import React from 'react';

import PostItem from '../../../../shared/Components/PostItem/PostItem';

const Posts = ({ data, currentPage }) => {
  return (
    <section data-component="Posts">
      <div className="row">
        {data.length
          ? data[currentPage].map((post, index) =>
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
