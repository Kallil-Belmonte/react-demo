import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';

import { MOCKY_INSTANCE, ENDPOINTS } from 'core/API/API';
import * as actionCreators from 'core/Redux/Actions/ActionCreators';
import * as Helpers from 'shared/Helpers';
import Loader from 'shared/Components/Loader/Loader';
import RegisterForm from 'pages/Auth/Register/RegisterForm/RegisterForm';
import './Register.scss';

const { auth } = ENDPOINTS;

class Register extends Component {
  state = {
    isLoading: false,
    form: {
      fieldsErrors: {
        email: [],
        password: [],
      },
    },
  }

  componentDidMount() {
    console.log('Utilize o e-mail: demo@demo.com para ver os alertas de erro.');
    Helpers.setPageTitle('Register');
    this.redirectLoggedUser();
  }


  //==============================
  // GENERAL METHODS
  //==============================

  // SET LOADING
  setLoading(isLoading) {
    this.setState({ isLoading });
  }


  // REDIRECT LOGGED USER
  redirectLoggedUser() {
    const authToken = sessionStorage.getItem('authTokenReactDemo') || localStorage.getItem('authTokenReactDemo');
    const expiredSession = new Date().getTime() > Date.parse(localStorage.getItem('expirationDateReactDemo'));

    if (authToken && !expiredSession) {
      this.props.history.push('/');
    }
  }


  // HANDLE REGISTER
  async handleRegister(values) {
    this.setLoading(true);

    try {
      const { data } = await MOCKY_INSTANCE.post(auth.register, values);
      const { token, firstName, lastName, email } = data;

      this.setLoading(false);

      if (values.email === 'demo@demo.com') {
        this.setState((prevState, props) => ({
          form: {
            ...prevState.form,
            fieldsErrors: {
              ...prevState.form.fieldsErrors,
              email: ['This e-mail already exists.'],
              password: ['Your password is too weak.'],
            },
          },
        }));
      } else {
        sessionStorage.setItem('authTokenReactDemo', token);
        this.props.dispatchSetUserData({ firstName, lastName, email });
        this.props.history.push('/');
      }
    } catch (error) {
      console.error(error);
      this.setLoading(false);
    }
  }


  // HANDLE CLEAR FORM MESSAGE
  handleClearFormMessage(object, property, index) {
    // Helpers.clearFieldErrorMessage(this, 'form', object, property, index);
  }


  //==============================
  // VIEW
  //==============================

  render() {
    const { isLoading, form } = this.state;

    return (
      <main data-component="Register">
        <Loader isLoading={isLoading} />

        <Container>
          <img src="/assets/img/logo.svg" className="logo d-block mx-auto" alt="logo" />

          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <RegisterForm
                fieldsErrors={form.fieldsErrors}
                onClearFormMessage={(object, property, index) => this.handleClearFormMessage(object, property, index)}
                onSubmit={(values) => this.handleRegister(values)}
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
  dispatchSetUserData: (userData) => dispatch(actionCreators.logIn(userData)),
});

export default connect(null, mapDispatchToProps)(withRouter(Register));
