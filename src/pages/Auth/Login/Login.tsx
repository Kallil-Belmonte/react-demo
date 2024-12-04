import { type FunctionComponent, useState } from 'react';

import { useNavigate, NavLink } from 'react-router-dom';

import type { LoginUserPayload } from '@/core/services/auth/types';
import { AUTH_TOKEN_KEY } from '@/shared/files/consts';
import { useDispatch, useField } from '@/shared/hooks';
import { loginUser } from '@/core/services';
import { setUser } from '@/core/redux/reducers/auth';
import { Loader, Input, Checkbox, Button } from '@/shared/components';
import Auth from '../Auth';

const Login: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const email = useField();
  const password = useField();
  const keepLogged = useField<boolean>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    try {
      const payload: LoginUserPayload = {
        email: email.value,
        password: password.value,
        keepLogged: keepLogged.value,
      };

      const user = await loginUser(payload);

      if (keepLogged.value) localStorage.setItem(AUTH_TOKEN_KEY, user.token);
      else sessionStorage.setItem(AUTH_TOKEN_KEY, user.token);

      dispatch(setUser({ firstName: user.firstName, lastName: user.lastName, email: user.email }));
      navigate('/');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Auth>
      <Loader loading={loading} />

      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="page-title">Login</h1>

        <div className="mb-3">
          <Input
            icon="Email"
            label="E-mail"
            type="email"
            name="email"
            required
            placeholder="Enter your e-mail"
            field={email}
          />
        </div>

        <div className="mb-3">
          <Input
            label="Password"
            type="password"
            name="password"
            required
            minLength={3}
            placeholder="Enter your password"
            field={password}
          />
        </div>

        <Checkbox label="Keep logged" name="keep-logged" field={keepLogged} />

        <Button className="d-block mx-auto" type="submit">
          Login
        </Button>

        <div className="text-center">
          <hr className="mt-4" />
          Don't have an account? <NavLink to="/register">Register</NavLink>
        </div>
      </form>
    </Auth>
  );
};

export default Login;
