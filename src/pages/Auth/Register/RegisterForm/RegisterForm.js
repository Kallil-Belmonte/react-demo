import React, { Fragment, useReducer, useCallback } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Form, Alert, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { MOCKY_INSTANCE, ENDPOINTS } from 'core/API/API';
import * as actionCreators from 'core/Redux/Actions/ActionCreators';
import Reducer from 'core/Hooks/Reducer';
import { emailPattern } from 'shared/Files/Regex';
import * as Helpers from 'shared/Helpers';
import Loader from 'shared/Components/Loader/Loader';
import './RegisterForm.scss';

const { Group, Label, Control } = Form;
const { auth } = ENDPOINTS;
const { setFieldClassName, getFieldErrorMessage, removeItemsFromArray } = Helpers;

const initialState = {
  isLoading: false,
  emailErrors: [],
  passwordErrors: [],
};

const RegisterForm = ({ history, dispatchSetUserData }) => {
  const { register, formState, errors, handleSubmit } = useForm();
  const { dirty, isSubmitting } = formState;

  const [state, setState] = useReducer(Reducer, initialState);
  const { isLoading, emailErrors, passwordErrors } = state;

  // HANDLE REGISTER
  const handleRegister = useCallback(async (values) => {
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
        sessionStorage.setItem('authTokenReactDemo', token);
        dispatchSetUserData({ firstName, lastName, email });
        history.push('/');
      }
    } catch (error) {
      console.error(error);
      setState({ isLoading: false });
    }
  }, [history]); // eslint-disable-line

  // HANDLE CLEAR FORM MESSAGE
  const handleClearFormMessage = useCallback((field, index) => {
    setState({ [field]: removeItemsFromArray(true, state[field], [index]) });
  }, [state]);

  return (
    <Fragment>
      <Loader isLoading={isLoading} />

      <Form data-component="RegisterForm" onSubmit={handleSubmit(handleRegister)}>
        <h1 className="page-title">Register</h1>

        <Group controlId="first-name">
          <Label>First name</Label>
          <Control
            className={setFieldClassName(errors.firstName)}
            type="text"
            name="firstName"
            ref={register({ required: { value: true, message: 'First name is required' } })}
          />
          {getFieldErrorMessage(errors.firstName)}
        </Group>

        <Group controlId="last-name">
          <Label>Last name</Label>
          <Control
            className={setFieldClassName(errors.lastName)}
            type="text"
            name="lastName"
            ref={register({ required: { value: true, message: 'Last name is required' } })}
          />
          {getFieldErrorMessage(errors.lastName)}
        </Group>

        <Group controlId="email">
          <Label>E-mail</Label>
          <Control
            className={setFieldClassName(errors.email)}
            type="text"
            name="email"
            ref={register({
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
            className={setFieldClassName(errors.password)}
            type="password"
            name="password"
            ref={register({
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
          disabled={!dirty || isSubmitting}
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


//==============================
// REDUX
//==============================

// MAP DISPATCH TO PROPS
const mapDispatchToProps = (dispatch) => ({
  dispatchSetUserData: (userData) => dispatch(actionCreators.logIn(userData)),
});

export default connect(null, mapDispatchToProps)(withRouter(RegisterForm));
