import React, { useReducer, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';

import axios, { ENDPOINTS } from 'core/API/API';
import Reducer from 'core/Hooks/Reducer';
import * as actionCreators from 'core/Redux/Actions/ActionCreators';
import Dashboard from 'layout/Dashboard';
import Loader from 'shared/Components/Loader/Loader';
import PostBody from 'pages/News/Post/PostBody/PostBody';
import DeletePostModal from 'pages/News/Post/DeletePostModal/DeletePostModal';

const { blog } = ENDPOINTS;

const initialState = {
  isLoading: true,
  isModalOpen: false,
};

const Post = ({ currentPost, history, match, dispatchSetCurrentPost }) => {
  const { id } = match.params;

  const [state, setState] = useReducer(Reducer, initialState);
  const { isLoading, isModalOpen } = state;

  // GET CURRENT POST
  const getCurrentPost = useCallback(async () => {
    try {
      const { data: post } = await axios.get(`${blog.posts}${id}`);
      dispatchSetCurrentPost(post);
    } catch (error) {
      console.error(error);
    } finally {
      setState({ isLoading: false });
    }
  }, []); // eslint-disable-line

  // HANDLE TOGGLE MODAL
  const handleToggleModal = useCallback(() => {
    setState({ isModalOpen: !isModalOpen });
  }, []); // eslint-disable-line

  // HANDLE DELETE POST
  const handleDeletePost = useCallback(async () => {
    setState({ isLoading: true });

    try {
      await axios.delete(`${blog.posts}${id}`);
      history.push('/blog');
    } catch (error) {
      console.error(error);
      setState({ isLoading: false });
    }
  }, []); // eslint-disable-line

  // LIFECYCLE HOOKS
  useEffect(() => {
    getCurrentPost();
  }, []); // eslint-disable-line

  return (
    <Dashboard>
      <main data-component="Post">
        <Loader isLoading={isLoading} />

        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <PostBody post={currentPost} onOpenModal={handleToggleModal} />
            </Col>
          </Row>
        </Container>

        <DeletePostModal
          isModalOpen={isModalOpen}
          onDelete={handleDeletePost}
          onCloseModal={handleToggleModal}
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
  dispatchSetCurrentPost: (post) => dispatch(actionCreators.setCurrentPost(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));
