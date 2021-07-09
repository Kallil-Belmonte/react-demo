import React, { Fragment, useReducer, useCallback } from 'react';

import { useHistory, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Alert, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { MOCKY_INSTANCE, ENDPOINTS } from 'core/api';
import * as Actions from 'core/redux/actions';
import State from 'core/hooks/State';
import { AUTH_TOKEN_KEY } from 'shared/files/consts';
import { emailPattern } from 'shared/files/regex';
import { getFieldClass, getFieldErrorMessage, removeItemsFromArray } from 'shared/helpers';
import Loader from 'shared/components/Loader/Loader';
import './RegisterForm.scss';

const { Group, Label, Control } = Form;
const { auth } = ENDPOINTS;

const initialState = {
  isLoading: false,
  emailErrors: [],
  passwordErrors: [],
};

const RegisterForm = ({ dispatchSetUserData }) => {
  const history = useHistory();

  const { register, formState, handleSubmit } = useForm();
  const { isDirty, isSubmitting, errors } = formState;

  const [state, setState] = useReducer(State, initialState);
  const { isLoading, emailErrors, passwordErrors } = state;

  const handleRegister = useCallback(
    async values => {
      setState({ isLoading: true });

      try {
        const { data } = await MOCKY_INSTANCE.post(auth.register, values);
        const { token, firstName, lastName, email } = data;

        setState({ isLoading: false });

        if (values.email === 'demo@demo.com') {
          setState({
            emailErrors: ['This e-mail does not exists.'],
            passwordErrors: ['The password is incorrect.'],
          });
        } else {
          sessionStorage.setItem(AUTH_TOKEN_KEY, token);
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

  const handleClearFormMessage = useCallback(
    (field, index) => {
      setState({ [field]: removeItemsFromArray(true, state[field], [index]) });
    },
    [state],
  );

  return (
    <Fragment>
      <Loader isLoading={isLoading} />

      <Form data-component="RegisterForm" onSubmit={handleSubmit(handleRegister)}>
        <h1 className="page-title">Register</h1>

        <Group controlId="first-name">
          <Label>First name</Label>
          <Control
            className={getFieldClass(errors.firstName)}
            type="text"
            {...register('firstName', {
              required: { value: true, message: 'First name is required' },
            })}
          />
          {getFieldErrorMessage(errors.firstName)}
        </Group>

        <Group controlId="last-name">
          <Label>Last name</Label>
          <Control
            className={getFieldClass(errors.lastName)}
            type="text"
            {...register('lastName', {
              required: { value: true, message: 'Last name is required' },
            })}
          />
          {getFieldErrorMessage(errors.lastName)}
        </Group>

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

        <Button
          className="d-block mx-auto"
          variant="primary"
          type="submit"
          disabled={!isDirty || isSubmitting}
        >
          Register
        </Button>

        <div className="text-center">
          <hr className="mt-4" />
          Aleady have an account? <NavLink to="/login">Login</NavLink>
        </div>
      </Form>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatchSetUserData: userData => dispatch(Actions.logIn(userData)),
});

export default connect(null, mapDispatchToProps)(RegisterForm);
