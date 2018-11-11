import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './Login.css';
import { MOCKY_INSTANCE, ENDPOINTS } from '../../../core/API/API';
import * as actionCreators from '../../../core/Redux/Actions/ActionCreators';
import Loader from '../../../shared/Components/Loader/Loader';
import LoginForm from './LoginForm/LoginForm';

class Login extends React.Component {
  state = {
    loading: false,
    loginForm: {
      fieldsErrors: {
        email: [],
        password: []
      }
    }
  }

  componentDidMount() {
    console.log('Utilize o e-mail: demo@demo.com para ver os alertas de erro.');
    this.redirectUser();
  }

  render() {
    return (
      <main data-component="Login">
        <Loader loading={this.state.loading} />

        <div className="container">
          <img src="/assets/img/logo.svg" className="logo d-block mx-auto" alt="logo" />

          <div className="row">
            <div className="offset-md-3 col-md-6">
              <LoginForm fieldsErrors={this.state.loginForm.fieldsErrors} onSubmit={(values) => this.handleLogin(values)} />
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


  // HANDLE LOGIN
  handleLogin(values) {
    // Show loader
    this.setState((prevState, props) => {
      return {
        loading: true
      };
    });

    MOCKY_INSTANCE.post(ENDPOINTS.auth.login, values)
      .then((response) => {
        if (values.email === 'demo@demo.com') {

          // Error simulation
          this.setState((prevState, props) => {
            return {
              loading: false,
              loginForm: {
                fieldsErrors: {
                  email: ['This e-mail does not exists.'],
                  password: ['The password is incorrect.']
                }
              }
            };
          });

        } else {

          // Handle set user data
          this.props.handleSetUserData({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            token: response.data.idToken,
            expiresIn: response.data.expiresIn
          });

          // Store session data
          if (values.keepLogged) {
            localStorage.setItem('authTokenReactDemo', response.data.idToken);
            localStorage.setItem('expirationDateAngularDemoReactDemo', new Date(new Date().getTime() + response.data.expiresIn * 1000).toISOString());
          } else {
            sessionStorage.setItem('authTokenReactDemo', response.data.idToken);
          }

          // Redirect
          this.props.history.push('/');

        }
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

export default connect(null, mapDispatchToProps)(withRouter(Login));
