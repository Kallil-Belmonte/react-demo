import React, { useCallback, useEffect } from 'react';

import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import Logo from 'shared/images/logo.svg';
import { setPageTitle } from 'shared/helpers';
import RegisterForm from 'pages/Auth/Register/RegisterForm/RegisterForm';
import './Register.scss';

const Register = ({ history }) => {
  // REDIRECT LOGGED USER
  const redirectLoggedUser = useCallback(() => {
    const authToken =
      sessionStorage.getItem('authTokenReactDemo') || localStorage.getItem('authTokenReactDemo');
    const expiredSession =
      new Date().getTime() > Date.parse(localStorage.getItem('expirationDateReactDemo'));

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

export default withRouter(Register);
