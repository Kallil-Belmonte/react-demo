import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// import './Post.scss';
import axios, { ENDPOINTS } from '../../../core/API/API';
import * as actionCreators from '../../../core/Redux/Actions/ActionCreators';
import Layout from '../../../layout/Layout';
import Loader from '../../../shared/Components/Loader/Loader';
import PostBody from './PostBody/PostBody';
import DeletePostModal from './DeletePostModal/DeletePostModal';

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
        <main data-component="Post">
          <Loader loading={this.state.loading} />

          <div className="container">
            <div className="row">
              <div className="offset-md-2 col-md-8">
                <PostBody data={this.props.currentPost} toggleModal={() => this.handleToggleModal()} />
              </div>
            </div>
          </div>

          <DeletePostModal
            isModalOpen={this.state.isModalOpen}
            toggleModal={() => this.handleToggleModal()}
            delete={() => this.handleDeletePost()} />
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
        // Handle set post
        this.props.handleSetPost(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .then(() => {
        // Deactivate loader
        this.setState((prevState, props) => {
          return {
            ...prevState,
            loading: false
          };
        });
      });
  }


  // HANDLE TOGGLE MODAL
  handleToggleModal() {
    this.setState((prevState, props) => {
      return {
        ...prevState,
        isModalOpen: !this.state.isModalOpen
      };
    });
  }


  // HANDLE DELETE POST
  handleDeletePost() {
    // Deactivate loader
    this.setState((prevState, props) => {
      return {
        ...prevState,
        loading: true
      };
    });

    axios.delete(ENDPOINTS.blog.posts + this.props.match.params.id)
      .then(response => {
        // Redirect
        this.props.history.push('/blog');
      })
      .catch(error => {
        console.error(error);

        // Deactivate loader
        this.setState((prevState, props) => {
          return {
            ...prevState,
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
    handleSetPost: (post) => dispatch(actionCreators.setPost(post))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));
