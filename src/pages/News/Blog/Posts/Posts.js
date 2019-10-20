import React from 'react';

import { Row, Col } from 'react-bootstrap';

import PostItem from 'shared/Components/PostItem/PostItem';

const Posts = ({ pages, currentPage }) => {
  return (
    <section data-component="Posts">
      <Row>
        {Object.keys(pages).length && pages[currentPage].map((post, index) =>
          <Col key={post.id} md={4}>
            <PostItem post={post} />
          </Col>
        )}
      </Row>
    </section>
  );
};

export default Posts;
