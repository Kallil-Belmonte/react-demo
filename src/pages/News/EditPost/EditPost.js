import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import Dashboard from 'layout/Dashboard';
import EditPostForm from 'pages/News/EditPost/EditPostForm/EditPostForm';

const EditPost = () => {
  return (
    <Dashboard>
      <main data-component="EditPost">
        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <EditPostForm />
            </Col>
          </Row>
        </Container>
      </main>
    </Dashboard>
  );
};

export default EditPost;
