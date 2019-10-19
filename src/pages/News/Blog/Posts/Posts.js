import React from 'react';

import { Row, Col } from 'react-bootstrap';

import PostItem from 'shared/Components/PostItem/PostItem';

const Posts = ({ data, currentPage }) => {
  return (
    <section data-component="Posts">
      <Row>
        {data.length && data[currentPage].map((post, index) =>
          <Col key={post.id} md={4}>
            <PostItem data={post} />
          </Col>
        )}
      </Row>
    </section>
  );
};

export default Posts;
