import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// import './EditPost.css';
import axios, { ENDPOINTS } from '../../../core/API/API';
import * as actionCreators from '../../../core/Redux/Actions/ActionCreators';
import Layout from '../../../layout/Layout';
import Loader from '../../../shared/Components/Loader/Loader';
import EditPostForm from './EditPostForm/EditPostForm';

class EditPost extends React.Component {
  state = {
    loading: false
  }

  render() {
    return (
      <Layout>
        <main className="edit-post-page">
          <Loader loading={this.state.loading} />

          <div className="container">
            <div className="row">
              <div className="offset-md-2 col-md-8">
                <EditPostForm onSubmit={(values) => this.handleSubmitEditPostForm(values)} />
              </div>
            </div>
          </div>
        </main>
      </Layout>
    );
  }


  //==============================
  // GENERAL METHODS
  //==============================

  // HANDLE SUBMIT EDIT POST FORM
  handleSubmitEditPostForm(values) {
    // Show loader
    this.setState((prevState, props) => {
      return {
        loading: true
      };
    });

    axios.put(ENDPOINTS.blog.posts + this.props.match.params.id, values)
      .then((response) => {
        // Handle edit post
        this.props.handleEditPost(response.data);

        // Redirect
        this.props.history.push('/post/' + this.props.match.params.id);
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

// MAP DISPATCH TO PROPS
const mapDispatchToProps = (dispatch) => {
  return {
    handleEditPost: (post) => dispatch(actionCreators.editPost(post))
  };
};

export default connect(null, mapDispatchToProps)(withRouter(EditPost));
