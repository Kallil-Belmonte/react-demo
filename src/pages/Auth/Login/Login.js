import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';

import { MOCKY_INSTANCE, ENDPOINTS } from 'core/API/API';
import * as actionCreators from 'core/Redux/Actions/ActionCreators';
import * as Helpers from 'shared/Helpers';
import Loader from 'shared/Components/Loader/Loader';
import LoginForm from 'pages/Auth/Login/LoginForm/LoginForm';
import './Login.scss';

class Login extends Component {
  state = {
    loading: false,
    form: {
      fieldsErrors: {
        email: [],
        password: [],
      },
    },
  }

  componentDidMount() {
    console.log('Utilize o e-mail: demo@demo.com para ver os alertas de erro.');
    Helpers.setPageTitle('Login');
    this.redirectUser();
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
    this.setState({ loading: true });

    MOCKY_INSTANCE.post(ENDPOINTS.auth.login, values)
      .then(response => {
        if (values.email === 'demo@demo.com') {

          // Error simulation
          this.setState((prevState, props) => ({
            loading: false,
            form: {
              ...prevState.form,
              fieldsErrors: {
                ...prevState.form.fieldsErrors,
                email: ['This e-mail does not exists.'],
                password: ['The password is incorrect.'],
              }
            },
          }));

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
            email: response.data.email,
          });

          // Redirect
          this.props.history.push('/');

        }
      })
      .catch(error => {
        console.error(error);

        // Deactivate loader
        this.setState({ loading: false });
      });
  }


  // HANDLE CLEAR FORM MESSAGE
  handleClearFormMessage(object, property, index) {
    Helpers.clearFormMessage(this, 'form', object, property, index);
  }


  //==============================
  // VIEW
  //==============================

  render() {
    const { loading, form } = this.state;

    return (
      <main data-component="Login">
        <Loader loading={loading} />

        <Container>
          <img src="/assets/img/logo.svg" className="logo d-block mx-auto" alt="logo" />

          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <LoginForm
                fieldsErrors={form.fieldsErrors}
                onClearFormMessage={(object, property, index) => this.handleClearFormMessage(object, property, index)}
                onSubmit={(values) => this.handleLogin(values)}
              />
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
}


//==============================
// REDUX
//==============================

// MAP DISPATCH TO PROPS
const mapDispatchToProps = (dispatch) => {
  return {
    handleSetUserData: (userData) => dispatch(actionCreators.logIn(userData)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Login));
