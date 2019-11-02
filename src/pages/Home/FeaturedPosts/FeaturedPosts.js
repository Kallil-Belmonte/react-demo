import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import PostItem from 'shared/Components/PostItem/PostItem';

const FeaturedPosts = ({ posts }) => {
  return (
    <section data-component="FeaturedPosts" className="page-section">
      <Container>
        <h2 className="section-title">Featured posts</h2>

        <Row>
          {posts.map((featuredPost, index) =>
            <Col md={4} key={featuredPost.id}>
              <PostItem post={featuredPost} />
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturedPosts;
