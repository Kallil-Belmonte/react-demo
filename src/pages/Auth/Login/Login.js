import React, { useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { Container, Row, Col } from 'react-bootstrap';

import * as Helpers from 'shared/Helpers';
import LoginForm from 'pages/Auth/Login/LoginForm/LoginForm';
import './Login.scss';

const { setPageTitle } = Helpers;

const Login = ({ history }) => {
  // REDIRECT LOGGED USER
  const redirectLoggedUser = useCallback(() => {
    const authToken = sessionStorage.getItem('authTokenReactDemo') || localStorage.getItem('authTokenReactDemo');
    const expiredSession = new Date().getTime() > Date.parse(localStorage.getItem('expirationDateReactDemo'));

    if (authToken && !expiredSession) {
      history.push('/');
    }
  }, [history]);

  // LIFECYCLE HOOKS
  useEffect(() => {
    console.log('Utilize o e-mail: demo@demo.com para ver os alertas de erro.');
    setPageTitle('Login');
    redirectLoggedUser();
  }, []); // eslint-disable-line

  return (
    <main data-component="Login">
      <Container>
        <img src="/assets/img/logo.svg" className="logo d-block mx-auto" alt="logo" />

        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default withRouter(Login);
