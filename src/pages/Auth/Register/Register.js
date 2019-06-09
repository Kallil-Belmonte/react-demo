import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './Register.scss';
import { MOCKY_INSTANCE, ENDPOINTS } from '../../../core/API/API';
import * as actionCreators from '../../../core/Redux/Actions/ActionCreators';
import Utils from '../../../shared/General/Utils';
import Loader from '../../../shared/Components/Loader/Loader';
import Form from './Form/Form';

class Register extends React.Component {

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
    this.redirectLoggedUser();
  }

  render() {
    return (
      <main data-component="Register">
        <Loader loading={this.state.loading} />

        <div className="container">
          <img src="/assets/img/logo.svg" className="logo d-block mx-auto" alt="logo" />

          <div className="row">
            <div className="offset-md-3 col-md-6">
              <Form
                onSubmit={(values) => this.handleRegister(values)}
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

  // REDIRECT LOGGED USER
  redirectLoggedUser() {
    const authToken = sessionStorage.getItem('authTokenReactDemo') || localStorage.getItem('authTokenReactDemo');
    const expiredSession = new Date().getTime() > Date.parse(localStorage.getItem('expirationDateReactDemo'));

    if (authToken && !expiredSession) {
      this.props.history.push('/');
    }
  }


  // HANDLE REGISTER
  handleRegister(values) {
    // Activate loader
    this.setState((prevState, props) => {
      return {
        ...prevState,
        loading: true
      };
    });

    MOCKY_INSTANCE.post(ENDPOINTS.auth.register, values)
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
                  email: ['This e-mail already exists.'],
                  password: ['Your password is too weak.']
                }
              }
            };
          });

        } else {

          // Store session data
          sessionStorage.setItem('authTokenReactDemo', response.data.idToken);

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

export default connect(null, mapDispatchToProps)(withRouter(Register));
