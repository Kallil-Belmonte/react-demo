import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import axios, { ENDPOINTS } from '../../../core/API/API';
import * as actionCreators from '../../../core/Redux/Actions/ActionCreators';
import Dashboard from '../../../layout/Dashboard';
import Loader from '../../../shared/Components/Loader/Loader';
import PostBody from './PostBody/PostBody';
import DeletePostModal from './DeletePostModal/DeletePostModal';

class Post extends React.Component {
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

  // GET CURRENT POST
  getCurrentPost() {
    axios.get(ENDPOINTS.blog.posts + this.props.match.params.id)
      .then((response) => {
        // Handle set post
        this.props.handleSetPost(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .then(() => {
        // Deactivate loader
        this.setState({ loading: false });
      });
  }


  // HANDLE TOGGLE MODAL
  handleToggleModal() {
    this.setState((prevState, props) => ({
      isModalOpen: !prevState.isModalOpen
    }));
  }


  // HANDLE DELETE POST
  handleDeletePost() {
    // Deactivate loader
    this.setState({ loading: true });

    axios.delete(ENDPOINTS.blog.posts + this.props.match.params.id)
      .then(() => {
        // Redirect
        this.props.history.push('/blog');
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
    const { currentPost } =  this.props;
    const { loading, isModalOpen } = this.state;

    return (
      <Dashboard>
        <main data-component="Post">
          <Loader loading={loading} />

          <div className="container">
            <div className="row">
              <div className="offset-md-2 col-md-8">
                <PostBody data={currentPost} onToggleModal={() => this.handleToggleModal()} />
              </div>
            </div>
          </div>

          <DeletePostModal
            isModalOpen={isModalOpen}
            onToggleModal={() => this.handleToggleModal()}
            onDelete={() => this.handleDeletePost()}
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
const mapStateToProps = (state) => {
  return {
    currentPost: state.currentPost,
  };
};

// MAP DISPATCH TO PROPS
const mapDispatchToProps = (dispatch) => {
  return {
    handleSetPost: (post) => dispatch(actionCreators.setPost(post)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));
