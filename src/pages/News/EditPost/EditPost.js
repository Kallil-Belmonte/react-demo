import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// import './EditPost.scss';
import axios, { ENDPOINTS } from '../../../core/API/API';
import * as actionCreators from '../../../core/Redux/Actions/ActionCreators';
import Layout from '../../../layout/Layout';
import Loader from '../../../shared/Components/Loader/Loader';
import Form from './Form/Form';

class EditPost extends React.Component {
  state = {
    loading: false,
  }

  render() {
    return (
      <Layout>
        <main data-component="EditPost">
          <Loader loading={this.state.loading} />

          <div className="container">
            <div className="row">
              <div className="offset-md-2 col-md-8">
                <Form onSubmit={(values) => this.handleSubmitForm(values)} />
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

  // HANDLE SUBMIT FORM
  handleSubmitForm(values) {
    // Activate loader
    this.setState((prevState, props) => ({
      loading: true,
    }));

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
        this.setState((prevState, props) => ({
          loading: false,
        }));
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
