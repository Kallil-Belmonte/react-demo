import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import axios, { ENDPOINTS } from '../../../core/API/API';
import * as actionCreators from '../../../core/Redux/Actions/ActionCreators';
import Dashboard from '../../../layout/Dashboard';
import Loader from '../../../shared/Components/Loader/Loader';
import Form from './Form/Form';

class EditPost extends React.Component {
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

          <div className="container">
            <div className="row">
              <div className="offset-md-2 col-md-8">
                <Form onSubmit={(values) => this.handleSubmitForm(values)} />
              </div>
            </div>
          </div>
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
