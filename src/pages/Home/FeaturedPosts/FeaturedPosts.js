import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import PostItem from 'shared/Components/PostItem/PostItem';

const FeaturedPosts = ({ posts }) => {
  return (
    <section data-component="FeaturedPosts" className="page-section">
      <Container>
        <h2 className="section-title">Featured posts</h2>

        <Row>
          {posts.map((featuredPost) => (
            <Col key={featuredPost.id} md={4}>
              <PostItem post={featuredPost} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturedPosts;
