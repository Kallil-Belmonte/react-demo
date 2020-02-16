import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';

import axios, { ENDPOINTS } from 'core/API/API';
import * as actionCreators from 'core/Redux/Actions/ActionCreators';
import Dashboard from 'layout/Dashboard';
import Loader from 'shared/Components/Loader/Loader';
import PostBody from 'pages/News/Post/PostBody/PostBody';
import DeletePostModal from 'pages/News/Post/DeletePostModal/DeletePostModal';

const { blog } = ENDPOINTS;

const Post = ({ currentPost, history, match, handleSetPost }) => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);


  // HANDLE TOGGLE MODAL
  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  // GET CURRENT POST
  const getCurrentPost = async () => {
    try {
      const response = await axios.get(`${blog.posts}${match.params.id}`);
      handleSetPost(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  // HANDLE DELETE POST
  const handleDeletePost = async () => {
    setLoading(true);

    try {
      await axios.delete(`${blog.posts}${this.props.match.params.id}`);
      history.push('/blog');
    } catch (error) {
      console.error(error);
      this.setLoading(false);
    }
  };


  // LIFECYCLE HOOKS
  useEffect(() => {
    getCurrentPost();
  }, []); // eslint-disable-line


  return (
    <Dashboard>
      <main data-component="Post">
        <Loader loading={loading} />

        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <PostBody post={currentPost} onOpenModal={() => handleToggleModal()} />
            </Col>
          </Row>
        </Container>

        <DeletePostModal
          isModalOpen={isModalOpen}
          onDelete={() => handleDeletePost()}
          onCloseModal={() => handleToggleModal()}
        />
      </main>
    </Dashboard>
  );
};


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
