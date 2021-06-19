import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import PostItem from 'shared/components/PostItem/PostItem';

const FeaturedPosts = ({ posts }) => {
  return (
    <section data-component="FeaturedPosts" className="page-section">
      <Container>
        <h2 className="section-title">Featured posts</h2>

        <Row>
          {posts.map(post => (
            <Col key={post.id} md={4}>
              <PostItem post={post} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturedPosts;
