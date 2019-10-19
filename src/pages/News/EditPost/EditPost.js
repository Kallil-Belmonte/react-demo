import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';

import axios, { ENDPOINTS } from 'core/API/API';
import * as actionCreators from 'core/Redux/Actions/ActionCreators';
import Dashboard from 'layout/Dashboard';
import Loader from 'shared/Components/Loader/Loader';
import EditPostForm from 'pages/News/EditPost/EditPostForm/EditPostForm';

class EditPost extends Component {
  state = {
    loading: false,
  }


  //==============================
  // GENERAL METHODS
  //==============================

  // HANDLE SUBMIT FORM
  handleSubmitForm(values) {
    // Activate loader
    this.setState({ loading: true });

    axios.put(ENDPOINTS.blog.posts + this.props.match.params.id, values)
      .then(response => {
        // Handle edit post
        this.props.handleEditPost(response.data);

        // Redirect
        this.props.history.push('/post/' + this.props.match.params.id);
      })
      .catch(error => {
        console.error(error);

        // Deactivate loader
        this.setState({ loading: false });
      });
  }


  //==============================
  // VIEW
  //==============================

  render() {
    const { loading } = this.state;

    return (
      <Dashboard>
        <main data-component="EditPost">
          <Loader loading={loading} />

          <Container>
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <EditPostForm onSubmit={(values) => this.handleSubmitForm(values)} />
              </Col>
            </Row>
          </Container>
        </main>
      </Dashboard>
    );
  }
}


//==============================
// REDUX
//==============================

// MAP DISPATCH TO PROPS
const mapDispatchToProps = (dispatch) => {
  return {
    handleEditPost: (post) => dispatch(actionCreators.editPost(post))
  };
};

export default connect(null, mapDispatchToProps)(withRouter(EditPost));
