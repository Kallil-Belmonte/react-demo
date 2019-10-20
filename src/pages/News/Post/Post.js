import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';

import axios, { ENDPOINTS } from 'core/API/API';
import * as actionCreators from 'core/Redux/Actions/ActionCreators';
import Dashboard from 'layout/Dashboard';
import Loader from 'shared/Components/Loader/Loader';
import PostBody from 'pages/News/Post/PostBody/PostBody';
import DeletePostModal from 'pages/News/Post/DeletePostModal/DeletePostModal';

class Post extends Component {
  state = {
    loading: true,
    isModalOpen: false,
  }

  componentDidMount() {
    this.getCurrentPost();
  }


  //==============================
  // GENERAL METHODS
  //==============================

  // SET LOADING
  setLoading(loading) {
    this.setState({ loading });
  }


  // HANDLE TOGGLE MODAL
  handleToggleModal() {
    this.setState((prevState, props) => ({
      isModalOpen: !prevState.isModalOpen
    }));
  }


  // GET CURRENT POST
  async getCurrentPost() {
    try {
      const response = await axios.get(`${ENDPOINTS.blog.posts}${this.props.match.params.id}`);
      this.props.handleSetPost(response.data);
    } catch (error) {
      throw error;
    } finally {
      this.setState(false);
    }
  }


  // HANDLE DELETE POST
  async handleDeletePost() {
    this.setLoading(true);

    try {
      const response = await axios.delete(`${ENDPOINTS.blog.posts}${this.props.match.params.id}`);
      this.props.history.push('/blog');
    } catch (error) {
      this.setLoading(false);
      throw error;
    }
  }


  //==============================
  // VIEW
  //==============================

  render() {
    const { currentPost } =  this.props;
    const { loading, isModalOpen } = this.state;

    return (
      <Dashboard>
        <main data-component="Post">
          <Loader loading={loading} />

          <Container>
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <PostBody post={currentPost} onOpenModal={() => this.handleToggleModal()} />
              </Col>
            </Row>
          </Container>

          <DeletePostModal
            isModalOpen={isModalOpen}
            onDelete={() => this.handleDeletePost()}
            onCloseModal={() => this.handleToggleModal()}
          />
        </main>
      </Dashboard>
    );
  }
}


//==============================
// REDUX
//==============================

// MAP STATE TO PROPS
const mapStateToProps = (state) => ({
  currentPost: state.currentPost,
});

// MAP DISPATCH TO PROPS
const mapDispatchToProps = (dispatch) => ({
  handleSetPost: (post) => dispatch(actionCreators.setPost(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));
