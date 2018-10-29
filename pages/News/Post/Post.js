import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './Post.css';
import axios, { ENDPOINTS } from '../../../core/API/API';
import * as actionCreators from '../../../core/Redux/Actions/ActionCreators';
import Layout from '../../../layout/Layout';
import Loader from '../../../shared/Components/Loader/Loader';
import Body from './Body/Body';
import DeleteConfirmationModal from './DeleteConfirmationModal/DeleteConfirmationModal';

class Post extends React.Component {
  state = {
    loading: true,
    isModalOpen: false
  }

  componentDidMount() {
    this.getCurrentPost();
  }

  render() {
    return (
      <Layout>
        <main className="post-page">
          <Loader loading={this.state.loading} />

          <div className="container">
            <div className="row">
              <div className="offset-md-2 col-md-8">
                <Body post={this.props.currentPost} toggleModal={() => this.handleToggleModal()} />
              </div>
            </div>
          </div>

          <DeleteConfirmationModal
            isModalOpen={this.state.isModalOpen}
            toggleModal={() => this.handleToggleModal()}
            delete={() => this.handleDeletePost()}
          />
        </main>
      </Layout>
    );
  }


  //==============================
  // GENERAL METHODS
  //==============================

  // GET CURRENT POST
  getCurrentPost() {
    axios.get(ENDPOINTS.blog.posts + this.props.match.params.id)
      .then((response) => {
        // Handle get post
        this.props.handleGetPost(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        // Hide loader
        this.setState((prevState, props) => {
          return {
            loading: false
          };
        });
      });
  }


  // HANDLE TOGGLE MODAL
  handleToggleModal() {
    this.setState((prevState, props) => {
      return { isModalOpen: !this.state.isModalOpen }
    });
  }


  // HANDLE DELETE POST
  handleDeletePost() {
    // Hide loader
    this.setState((prevState, props) => {
      return {
        loading: true
      };
    });

    axios.delete(ENDPOINTS.blog.posts + this.props.match.params.id)
      .then((response) => {
        // Redirect
        this.props.history.push('/blog');
      })
      .catch((error) => {
        console.log(error);

        // Hide loader
        this.setState((prevState, props) => {
          return {
            loading: false
          };
        });
      });
  }
}


//==============================
// REDUX
//==============================

// MAP STATE TO PROPS
const mapStateToProps = (state) => {
  return {
    currentPost: state.currentPost
  };
};

// MAP DISPATCH TO PROPS
const mapDispatchToProps = (dispatch) => {
  return {
    handleGetPost: (post) => dispatch(actionCreators.getPost(post))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));
