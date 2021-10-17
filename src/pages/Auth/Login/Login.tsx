import React from 'react';

import { useHistory, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { FormState } from '@/pages/Auth/_files/types';
import { LoginUserPayload } from '@/core/services/auth/types';
import { AUTH_TOKEN_KEY, EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import { emailRegex } from '@/shared/files/regex';
import { clearFormMessage, getFieldClass, getFieldErrorMessage } from '@/shared/helpers';
import { useAppDispatch, useCustomState } from '@/shared/hooks';
import { loginUser } from '@/core/services';
import { setUser } from '@/core/redux/reducers/auth';
import AppLoader from '@/shared/components/AppLoader/AppLoader';
import AppAlertDismissible from '@/shared/components/AppAlertDismissible/AppAlertDismissible';
import Auth from '../Auth';

const initialState: FormState = {
  isLoading: false,
  serverErrors: {
    email: [],
    password: [],
    request: [],
  },
};

const Login = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { register, formState, handleSubmit } = useForm<LoginUserPayload>();
  const { errors } = formState;

  const [state, setState] = useCustomState<FormState>(initialState);
  const { isLoading, serverErrors } = state;

  const handleLogin = async (values: LoginUserPayload) => {
    setState({ isLoading: true });

    try {
      const payload: LoginUserPayload = {
        email: values.email,
        password: values.password,
        keepLogged: values.keepLogged,
      };
      const { token, expiresIn, firstName, lastName, email } = await loginUser(payload);

      const expirationDate = new Date(
        new Date().getTime() + Number(expiresIn) * 1000,
      ).toISOString();

      if (values.email === 'demo@demo.com') {
        setState({
          serverErrors: {
            email: ['This e-mail does not exists.'],
            password: ['The password is incorrect.'],
            request: [],
          },
        });
      } else {
        if (values.keepLogged) {
          localStorage.setItem(AUTH_TOKEN_KEY, token);
          localStorage.setItem(EXPIRATION_DATE_KEY, expirationDate);
        } else {
          sessionStorage.setItem(AUTH_TOKEN_KEY, token);
        }

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

      <form className="auth-form" onSubmit={handleSubmit(handleLogin)}>
        <h1 className="page-title">Login</h1>

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

        <div className="form-check">
          <input
            id="keep-logged"
            className="form-check-input"
            type="checkbox"
            {...register('keepLogged')}
          />
          <label className="form-check-label" htmlFor="keep-logged">
            Keep logged
          </label>
        </div>

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
          Login
        </button>

        <div className="text-center">
          <hr className="mt-4" />
          Don't have an account? <NavLink to="/register">Register</NavLink>
        </div>
      </form>
    </Auth>
  );
};

export default Login;
