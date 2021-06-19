import React from 'react';

import { Row, Col } from 'react-bootstrap';

import PostItem from 'shared/components/PostItem/PostItem';

const { keys } = Object;

const Posts = ({ pages, currentPage }) => {
  return (
    <section data-component="Posts">
      <Row>
        {!!keys(pages).length &&
          pages[currentPage].map(post => (
            <Col key={post.id} md={4}>
              <PostItem post={post} />
            </Col>
          ))}
      </Row>
    </section>
  );
};

export default Posts;
