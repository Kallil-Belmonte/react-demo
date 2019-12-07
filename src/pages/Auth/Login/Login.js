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

  // SET LOADING
  setLoading(loading) {
    this.setState({ loading });
  }


  // REDIRECT USER
  redirectUser() {
    const authToken = sessionStorage.getItem('authTokenReactDemo') || localStorage.getItem('authTokenReactDemo');
    const expiredSession = new Date().getTime() > Date.parse(localStorage.getItem('expirationDateReactDemo'));

    if (authToken && !expiredSession) {
      this.props.history.push('/');
    }
  }


  // HANDLE LOGIN
  async handleLogin(values) {
    this.setLoading(true);

    try {
      const response = await MOCKY_INSTANCE.post(ENDPOINTS.auth.login, values);
      const { idToken, expiresIn, firstName, lastName, email } = response.data;
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000).toISOString();

      this.setLoading(false);

      if (values.email === 'demo@demo.com') {
        this.setState((prevState, props) => ({
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
        if (values.keepLogged) {
          localStorage.setItem('authTokenReactDemo', idToken);
          localStorage.setItem('expirationDateReactDemo', expirationDate);
        } else {
          sessionStorage.setItem('authTokenReactDemo', idToken);
        }

        this.props.handleSetUserData({ firstName, lastName, email });
        this.props.history.push('/');
      }
    } catch (error) {
      console.error(error);
      this.setLoading(false);
    }
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
const mapDispatchToProps = (dispatch) => ({
  handleSetUserData: (userData) => dispatch(actionCreators.logIn(userData)),
});

export default connect(null, mapDispatchToProps)(withRouter(Login));
