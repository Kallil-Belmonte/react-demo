import React from 'react';

import { useHistory, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { FormState } from '@/pages/Auth/_files/types';
import { RegisterUserPayload } from '@/core/services/auth/types';
import { AUTH_TOKEN_KEY, EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import { emailRegex } from '@/shared/files/regex';
import { clearFormMessage, getFieldClass, getFieldErrorMessage } from '@/shared/helpers';
import { useDispatch, useCustomState } from '@/shared/hooks';
import { registerUser } from '@/core/services';
import { setUser } from '@/core/redux/reducers/auth';
import { AppAlertDismissible, AppLoader } from '@/shared/components';
import Auth from '../Auth';

const initialState: FormState = {
  isLoading: false,
  serverErrors: {
    email: [],
    password: [],
    request: [],
  },
};

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { register, formState, handleSubmit } = useForm<RegisterUserPayload>();
  const { errors } = formState;

  const [state, setState] = useCustomState<FormState>(initialState);
  const { isLoading, serverErrors } = state;

  const handleRegister = async (values: RegisterUserPayload) => {
    setState({ isLoading: true });

    try {
      const payload: RegisterUserPayload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      };
      const { token, firstName, lastName, email } = await registerUser(payload);

      if (values.email === 'demo@demo.com') {
        setState({
          serverErrors: {
            email: ['This e-mail does not exists.'],
            password: ['The password is incorrect.'],
            request: [],
          },
        });
      } else {
        sessionStorage.setItem(AUTH_TOKEN_KEY, token);
        dispatch(setUser({ firstName, lastName, email }));
        history.push('/');
      }
    } catch (error: any) {
      setState({
        serverErrors: {
          email: [],
          password: [],
          request: [error.message],
        },
      });
    } finally {
      setState({ isLoading: false });
    }
  };

  const handleClearFormMessage = (field: string, index: number) => {
    clearFormMessage(field, index, state, setState);
  };

  return (
    <Auth>
      <AppLoader isLoading={isLoading} />

      <form className="auth-form" onSubmit={handleSubmit(handleRegister)}>
        <h1 className="page-title">Register</h1>

        <div className="mb-3">
          <label className="form-label" htmlFor="first-name">
            First name
          </label>
          <input
            id="first-name"
            className={getFieldClass(errors.firstName)}
            type="text"
            {...register('firstName', {
              required: { value: true, message: 'First name is required' },
              minLength: { value: 2, message: 'Must be 2 characters or more' },
            })}
          />
          {getFieldErrorMessage(errors.firstName)}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="last-name">
            Last name
          </label>
          <input
            id="last-name"
            className={getFieldClass(errors.lastName)}
            type="text"
            {...register('lastName', {
              required: { value: true, message: 'Last name is required' },
              minLength: { value: 2, message: 'Must be 2 characters or more' },
            })}
          />
          {getFieldErrorMessage(errors.lastName)}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            E-mail address
          </label>
          <input
            id="email"
            className={getFieldClass(errors.email)}
            type="email"
            {...register('email', {
              required: { value: true, message: 'E-mail is required' },
              pattern: { value: emailRegex, message: 'Invalid e-mail' },
            })}
          />
          {getFieldErrorMessage(errors.email)}
        </div>

        {serverErrors.email.map((errorMessage, index) => (
          <AppAlertDismissible
            key={errorMessage}
            variant="danger"
            onDismiss={() => handleClearFormMessage('email', index)}
          >
            {errorMessage}
          </AppAlertDismissible>
        ))}

        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className={getFieldClass(errors.password)}
            type="password"
            {...register('password', {
              required: { value: true, message: 'Password is required' },
              minLength: { value: 3, message: 'Minimum 3 characters required' },
            })}
          />
          {getFieldErrorMessage(errors.password)}
        </div>

        {serverErrors.password.map((errorMessage, index) => (
          <AppAlertDismissible
            key={errorMessage}
            variant="danger"
            onDismiss={() => handleClearFormMessage('password', index)}
          >
            {errorMessage}
          </AppAlertDismissible>
        ))}

        {serverErrors.request.map((errorMessage, index) => (
          <AppAlertDismissible
            key={errorMessage}
            variant="danger"
            onDismiss={() => handleClearFormMessage('request', index)}
          >
            {errorMessage}
          </AppAlertDismissible>
        ))}

        <button className="btn btn-primary d-block mx-auto" type="submit">
          Register
        </button>

        <div className="text-center">
          <hr className="mt-4" />
          Aleady have an account? <NavLink to="/login">Login</NavLink>
        </div>
      </form>
    </Auth>
  );
};

export default Register;
