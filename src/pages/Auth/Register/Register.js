import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './Register.css';
import { MOCKY_INSTANCE, ENDPOINTS } from '../../../core/API/API';
import * as actionCreators from '../../../core/Redux/Actions/ActionCreators';
import Loader from '../../../shared/Components/Loader/Loader';
import RegisterForm from './RegisterForm/RegisterForm';

class Register extends React.Component {
  state = {
    loading: false
  }

  componentDidMount() {
    this.redirectUser();
  }

  render() {
    return (
      <main data-component="Register">
        <Loader loading={this.state.loading} />

        <div className="container">
          <img src="/assets/img/logo.svg" className="logo d-block mx-auto" alt="logo" />

          <div className="row">
            <div className="offset-md-3 col-md-6">
              <RegisterForm onSubmit={(values) => this.handleRegister(values)} />
            </div>
          </div>
        </div>
      </main>
    );
  }


  //==============================
  // GENERAL METHODS
  //==============================

  // REDIRECT USER
  redirectUser() {
    let authToken = sessionStorage.getItem('authTokenReactDemo') || localStorage.getItem('authTokenReactDemo');
    let expiredSession = new Date().getTime() > Date.parse(localStorage.getItem('expirationDateAngularDemoReactDemo'));

    if (authToken && !expiredSession) {
      this.props.history.push('/');
    }
  }


  // HANDLE REGISTER
  handleRegister(values) {
    // Show loader
    this.setState((prevState, props) => {
      return {
        loading: true
      };
    });

    MOCKY_INSTANCE.post(ENDPOINTS.auth.register, values)
      .then((response) => {
        // Handle set user data
        this.props.handleSetUserData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          token: response.data.idToken,
          expiresIn: response.data.expiresIn
        });

        // Store session data
        sessionStorage.setItem('authTokenReactDemo', response.data.idToken);

        // Redirect
        this.props.history.push('/');
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
    handleSetUserData: (userData) => dispatch(actionCreators.logIn(userData))
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Register));
