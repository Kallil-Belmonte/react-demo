import React from 'react';

import { useNavigate, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { FormState } from '@/pages/Auth/_files/types';
import { LoginUserPayload } from '@/core/services/auth/types';
import { AUTH_TOKEN_KEY, AUTH_EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import { requiredEmail, requiredMin } from '@/shared/files/validations';
import { clearFormMessage, validateForm } from '@/shared/helpers';
import { useDispatch, useCustomState, useField } from '@/shared/hooks';
import { loginUser } from '@/core/services';
import { setUser } from '@/core/redux/reducers/auth';
import { AlertDismissible, Loader, Input, Checkbox } from '@/shared/components';
import Auth from '../Auth';

const initialState: FormState = {
  isLoading: false,
  isFormSubmitted: false,
  serverErrors: {
    email: [],
    password: [],
    request: [],
  },
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, formState, handleSubmit } = useForm<LoginUserPayload>();
  const { errors } = formState;

  const [state, setState] = useCustomState<FormState>(initialState);
  const { isLoading, isFormSubmitted, serverErrors } = state;

  const email = useField({ name: 'email', validation: requiredEmail });
  const password = useField({ name: 'password', validation: requiredMin(3) });
  const keepLogged = useField<boolean>({ name: 'keep-logged' });

  const handleLogin = async (values: LoginUserPayload) => {
    setState({ isFormSubmitted: true });

    const isValidFields = validateForm([
      { fields: [email], validation: requiredEmail },
      { fields: [password], validation: requiredMin(3) },
    ]);
    if (!isValidFields) return;

    setState({
      isLoading: true,
      serverErrors: { email: [], password: [], request: [] },
    });

    try {
      const { token, expiresIn, firstName, lastName, email } = await loginUser(values);

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
          localStorage.setItem(AUTH_EXPIRATION_DATE_KEY, expirationDate);
        } else {
          sessionStorage.setItem(AUTH_TOKEN_KEY, token);
        }

        dispatch(setUser({ firstName, lastName, email }));
        navigate('/');
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
      <Loader isLoading={isLoading} />

      <form className="auth-form" onSubmit={handleSubmit(handleLogin)}>
        <h1 className="page-title">Login</h1>

        <div className="mb-3">
          <Input
            type="email"
            label="E-mail address"
            field={email}
            isFormSubmitted={isFormSubmitted}
          />
        </div>

        {serverErrors.email.map((errorMessage, index) => (
          <AlertDismissible
            key={errorMessage}
            variant="danger"
            onDismiss={() => handleClearFormMessage('email', index)}
          >
            {errorMessage}
          </AlertDismissible>
        ))}

        <div className="mb-3">
          <Input
            type="password"
            label="Password"
            field={password}
            isFormSubmitted={isFormSubmitted}
          />
        </div>

        {serverErrors.password.map((errorMessage, index) => (
          <AlertDismissible
            key={errorMessage}
            variant="danger"
            onDismiss={() => handleClearFormMessage('password', index)}
          >
            {errorMessage}
          </AlertDismissible>
        ))}

        <div className="form-check">
          <Checkbox label="Keep logged" field={keepLogged} isFormSubmitted={isFormSubmitted} />

          {/* <label className="form-check-label" htmlFor="keep-logged">
            Keep logged
          </label>
          <input
            id="keep-logged"
            className="form-check-input"
            type="checkbox"
            {...register('keepLogged')}
          /> */}
        </div>

        {serverErrors.request.map((errorMessage, index) => (
          <AlertDismissible
            key={errorMessage}
            variant="danger"
            onDismiss={() => handleClearFormMessage('request', index)}
          >
            {errorMessage}
          </AlertDismissible>
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
