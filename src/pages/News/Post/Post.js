import React, { useReducer, useCallback, useEffect } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import axios, { ENDPOINTS } from 'core/api';
import State from 'core/hooks/State';
import * as Actions from 'core/redux/actions';
import Dashboard from 'layout/Dashboard';
import Loader from 'shared/components/Loader/Loader';
import PostBody from 'pages/News/Post/PostBody/PostBody';
import DeletePostModal from 'pages/News/Post/DeletePostModal/DeletePostModal';

const { blog } = ENDPOINTS;

const initialState = {
  isLoading: true,
  isModalOpen: false,
};

const Post = ({ currentPost, history, match, dispatchSetCurrentPost }) => {
  const { id } = match.params;

  const [state, setState] = useReducer(State, initialState);
  const { isLoading, isModalOpen } = state;

  const getCurrentPost = useCallback(async () => {
    try {
      const { data: posts } = await axios.get(`${blog.posts}${id}`);
      dispatchSetCurrentPost(posts);
    } catch (error) {
      console.error(error);
    } finally {
      setState({ isLoading: false });
    }
  }, [id, dispatchSetCurrentPost]);

  const handleToggleModal = useCallback(() => {
    setState({ isModalOpen: !isModalOpen });
  }, [isModalOpen]);

  const handleDeletePost = useCallback(async () => {
    setState({ isLoading: true });

    try {
      await axios.delete(`${blog.posts}${id}`);
      history.push('/blog');
    } catch (error) {
      console.error(error);
      setState({ isLoading: false });
    }
  }, [id, history]);

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

const mapStateToProps = ({ currentPost }) => ({
  currentPost,
});

const mapDispatchToProps = dispatch => ({
  dispatchSetCurrentPost: post => dispatch(Actions.setCurrentPost(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));
