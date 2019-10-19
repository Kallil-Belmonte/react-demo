import React, { Fragment } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import PostItem from 'shared/Components/PostItem/PostItem';

const FeaturedPosts = ({ data }) => {
  return (
    <section data-component="FeaturedPosts" className="page-section">
      <Container>
        <h2 className="section-title">Featured posts</h2>

        <Row>
          {data.slice(0, 3).map((featuredPost, index) =>
            <Col md={4} key={featuredPost.id}>
              <PostItem data={featuredPost} />
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturedPosts;
