import React, { useCallback, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import Logo from 'shared/images/logo.svg';
import { setPageTitle } from 'shared/helpers';
import { AUTH_TOKEN_KEY, EXPIRATION_DATE_KEY } from 'shared/files/consts';
import RegisterForm from 'pages/Auth/Register/RegisterForm/RegisterForm';
import './Register.scss';

const Register = () => {
  const history = useHistory();

  const redirectLoggedUser = useCallback(() => {
    const authToken =
      sessionStorage.getItem(AUTH_TOKEN_KEY) || localStorage.getItem(AUTH_TOKEN_KEY);
    const expiredSession =
      new Date().getTime() > Date.parse(localStorage.getItem(EXPIRATION_DATE_KEY));

    if (authToken && !expiredSession) {
      history.push('/');
    }
  }, [history]);

  // LIFECYCLE HOOKS
  useEffect(() => {
    setPageTitle('Login');
    redirectLoggedUser();
  }, []); // eslint-disable-line

  return (
    <main data-component="Register">
      <Container>
        <img src={Logo} className="logo d-block mx-auto" alt="logo" />

        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <RegisterForm />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Register;
