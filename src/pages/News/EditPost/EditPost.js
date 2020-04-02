import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';

import axios, { ENDPOINTS } from 'core/API/API';
import * as actionCreators from 'core/Redux/Actions/ActionCreators';
import Dashboard from 'layout/Dashboard';
import Loader from 'shared/Components/Loader/Loader';
import EditPostForm from 'pages/News/EditPost/EditPostForm/EditPostForm';

const { blog } = ENDPOINTS;

const EditPost = ({ history, match, handleEditPost }) => {
  const [loading, setLoading] = useState(false);


  // HANDLE SUBMIT FORM
  const handleSubmitForm = async (values) => {
    setLoading(true);

    try {
      const { data } = await axios.put(`${blog.posts}${match.params.id}`, values);
      handleEditPost(data);
      history.push(`/post/${match.params.id}`);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }


  return (
    <Dashboard>
      <main data-component="EditPost">
        <Loader loading={loading} />

        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <EditPostForm onSubmit={(values) => handleSubmitForm(values)} />
            </Col>
          </Row>
        </Container>
      </main>
    </Dashboard>
  );
};


//==============================
// REDUX
//==============================

// MAP DISPATCH TO PROPS
const mapDispatchToProps = (dispatch) => ({
  handleEditPost: (post) => dispatch(actionCreators.editPost(post))
});

export default connect(null, mapDispatchToProps)(withRouter(EditPost));
