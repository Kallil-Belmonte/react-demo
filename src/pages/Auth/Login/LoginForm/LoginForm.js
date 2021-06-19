import React, { Fragment, useReducer, useCallback } from 'react';

import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Alert, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { MOCKY_INSTANCE, ENDPOINTS } from 'core/api';
import * as Actions from 'core/redux/actions';
import State from 'core/hooks/State';
import { emailPattern } from 'shared/files/regex';
import { getFieldClass, getFieldErrorMessage, removeItemsFromArray } from 'shared/helpers';
import Loader from 'shared/components/Loader/Loader';
import './LoginForm.scss';

const { Group, Label, Control } = Form;
const { auth } = ENDPOINTS;

const initialState = {
  isLoading: false,
  emailErrors: [],
  passwordErrors: [],
};

const LoginForm = ({ history, dispatchSetUserData }) => {
  const { register, formState, handleSubmit } = useForm();
  const { isDirty, isSubmitting, errors } = formState;

  const [state, setState] = useReducer(State, initialState);
  const { isLoading, emailErrors, passwordErrors } = state;

  // HANDLE LOGIN
  const handleLogin = useCallback(
    async values => {
      setState({ isLoading: true });

      try {
        const { data } = await MOCKY_INSTANCE.post(auth.login, values);
        const { idToken, expiresIn, firstName, lastName, email } = data;
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000).toISOString();

        setState({ isLoading: false });

        if (values.email === 'demo@demo.com') {
          setState({
            emailErrors: ['This e-mail does not exists.'],
            passwordErrors: ['The password is incorrect.'],
          });
        } else {
          if (values.keepLogged) {
            localStorage.setItem('authTokenReactDemo', idToken);
            localStorage.setItem('expirationDateReactDemo', expirationDate);
          } else {
            sessionStorage.setItem('authTokenReactDemo', idToken);
          }

          dispatchSetUserData({ firstName, lastName, email });
          history.push('/');
        }
      } catch (error) {
        console.error(error);
        setState({ isLoading: false });
      }
    },
    [dispatchSetUserData, history],
  );

  // HANDLE CLEAR FORM MESSAGE
  const handleClearFormMessage = useCallback(
    (field, index) => {
      setState({ [field]: removeItemsFromArray(true, state[field], [index]) });
    },
    [state],
  );

  return (
    <Fragment>
      <Loader isLoading={isLoading} />

      <Form data-component="LoginForm" onSubmit={handleSubmit(handleLogin)}>
        <h1 className="page-title">Login</h1>

        <Group controlId="email">
          <Label>E-mail</Label>
          <Control
            className={getFieldClass(errors.email)}
            type="text"
            {...register('email', {
              required: { value: true, message: 'E-mail is required' },
              pattern: { value: emailPattern, message: 'Invalid e-mail' },
            })}
          />
          {getFieldErrorMessage(errors.email)}

          {emailErrors.map((errorMessage, index) => (
            <Alert
              key={errorMessage}
              variant="danger"
              dismissible
              onClose={() => handleClearFormMessage('emailErrors', index)}
            >
              {errorMessage}
            </Alert>
          ))}
        </Group>

        <Group controlId="password">
          <Label>Password</Label>
          <Control
            className={getFieldClass(errors.password)}
            type="password"
            {...register('password', {
              required: { value: true, message: 'Password is required' },
              minLength: { value: 3, message: 'Minimum 3 characters required' },
            })}
          />
          {getFieldErrorMessage(errors.password)}

          {passwordErrors.map((errorMessage, index) => (
            <Alert
              key={errorMessage}
              variant="danger"
              dismissible
              onClose={() => handleClearFormMessage('passwordErrors', index)}
            >
              {errorMessage}
            </Alert>
          ))}
        </Group>

        <Group>
          <div className="pretty p-svg p-curve">
            <input type="checkbox" {...register('keepLogged')} />
            <div className="state p-primary">
              <svg className="svg svg-icon" viewBox="0 0 20 20">
                <path
                  d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                  style={{ stroke: '#FFF', fill: '#FFF' }}
                ></path>
              </svg>
              <label>Keep logged</label>
            </div>
          </div>
        </Group>

        <Button
          className="d-block mx-auto"
          variant="primary"
          type="submit"
          disabled={!isDirty || isSubmitting}
        >
          Login
        </Button>

        <div className="text-center">
          <hr className="mt-4" />
          Don't have an account? <NavLink to="/register">Register</NavLink>
        </div>
      </Form>
    </Fragment>
  );
};

//==============================
// REDUX
//==============================

// MAP DISPATCH TO PROPS
const mapDispatchToProps = dispatch => ({
  dispatchSetUserData: userData => dispatch(Actions.logIn(userData)),
});

export default connect(null, mapDispatchToProps)(withRouter(LoginForm));
