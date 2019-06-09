import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './Login.scss';
import { MOCKY_INSTANCE, ENDPOINTS } from '../../../core/API/API';
import * as actionCreators from '../../../core/Redux/Actions/ActionCreators';
import Utils from '../../../shared/General/Utils';
import Loader from '../../../shared/Components/Loader/Loader';
import Form from './Form/Form';

class Login extends React.Component {

  state = {
    loading: false,
    form: {
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
              <Form
                onSubmit={(values) => this.handleLogin(values)}
                fieldsErrors={this.state.form.fieldsErrors}
                clearFormMessage={(object, property, index) => this.handleClearFormMessage(object, property, index)} />
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
    const authToken = sessionStorage.getItem('authTokenReactDemo') || localStorage.getItem('authTokenReactDemo');
    const expiredSession = new Date().getTime() > Date.parse(localStorage.getItem('expirationDateReactDemo'));

    if (authToken && !expiredSession) {
      this.props.history.push('/');
    }
  }


  // HANDLE LOGIN
  handleLogin(values) {
    // Activate loader
    this.setState((prevState, props) => {
      return {
        ...prevState,
        loading: true
      };
    });

    MOCKY_INSTANCE.post(ENDPOINTS.auth.login, values)
      .then(response => {
        if (values.email === 'demo@demo.com') {

          // Error simulation
          this.setState((prevState, props) => {
            return {
              ...prevState,
              loading: false,
              form: {
                ...prevState.form,
                fieldsErrors: {
                  ...prevState.form.fieldsErrors,
                  email: ['This e-mail does not exists.'],
                  password: ['The password is incorrect.']
                }
              }
            };
          });

        } else {

          // Store session data
          if (values.keepLogged) {
            localStorage.setItem('authTokenReactDemo', response.data.idToken);
            localStorage.setItem('expirationDateReactDemo', new Date(new Date().getTime() + response.data.expiresIn * 1000).toISOString());
          } else {
            sessionStorage.setItem('authTokenReactDemo', response.data.idToken);
          }

          // Handle set user data
          this.props.handleSetUserData({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email
          });

          // Redirect
          this.props.history.push('/');

        }
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


  // HANDLE CLEAR FORM MESSAGE
  handleClearFormMessage(object, property, index) {
    Utils.clearFormMessage(this, 'form', object, property, index);
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
