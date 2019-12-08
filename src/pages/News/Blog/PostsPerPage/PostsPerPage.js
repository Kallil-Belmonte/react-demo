import React from 'react';

import { Row, Col, Form } from 'react-bootstrap';

import './PostsPerPage.scss';

const PostsPerPage = ({ postsPerPage, onChange }) => {
  return (
    <section data-component="PostsPerPage">
      <Row>
        <Col md={2}>
          <Form.Group controlId="filter">
            <Form.Label>Posts per page:</Form.Label>
            <Form.Control as="select" value={postsPerPage} onChange={(event) => onChange(Number(event.target.value))}>
              <option value="9">9</option>
              <option value="18">18</option>
              <option value="27">27</option>
              <option value="36">36</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </section>
  );
};

export default PostsPerPage;
