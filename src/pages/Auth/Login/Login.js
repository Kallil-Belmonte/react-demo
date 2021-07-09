import React, { useCallback, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import Logo from 'shared/images/logo.svg';
import { setPageTitle } from 'shared/helpers';
import { ACCESS_TOKEN_KEY, EXPIRATION_DATE_KEY } from 'shared/files/consts';
import LoginForm from 'pages/Auth/Login/LoginForm/LoginForm';
import './Login.scss';

const Login = () => {
  const history = useHistory();

  const redirectLoggedUser = useCallback(() => {
    const authToken =
      sessionStorage.getItem(ACCESS_TOKEN_KEY) || localStorage.getItem(ACCESS_TOKEN_KEY);
    const expiredSession =
      new Date().getTime() > Date.parse(localStorage.getItem(EXPIRATION_DATE_KEY));

    if (authToken && !expiredSession) {
      history.push('/');
    }
  }, [history]);

  // LIFECYCLE HOOKS
  useEffect(() => {
    console.log('Para logar utilize qualquer e-mail e senha.');
    console.log('Para ver os alertas de erro utilize o e-mail: demo@demo.com');
    setPageTitle('Login');
    redirectLoggedUser();
  }, []); // eslint-disable-line

  return (
    <main data-component="Login">
      <Container>
        <img src={Logo} className="logo d-block mx-auto" alt="logo" />

        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Login;
