import { type FunctionComponent, useState } from 'react';

import { useNavigate, NavLink } from 'react-router-dom';

import type { RegisterUserPayload } from '@/core/services/auth/types';
import { AUTH_TOKEN_KEY } from '@/shared/files/consts';
import { useDispatch, useField } from '@/shared/hooks';
import { registerUser } from '@/core/services';
import { setUser } from '@/core/redux/reducers/auth';
import { Loader, Input, Button } from '@/shared/components';
import Auth from '../Auth';

const Register: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const firstName = useField();
  const lastName = useField();
  const email = useField();
  const password = useField();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    try {
      const payload: RegisterUserPayload = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      };

      const user = await registerUser(payload);

      sessionStorage.setItem(AUTH_TOKEN_KEY, user.token);
      dispatch(setUser({ firstName: user.firstName, lastName: user.lastName, email: user.email }));
      navigate('/');
    } catch (error: any) {
      setLoading(false);
    }
  };

  return (
    <Auth>
      <Loader loading={loading} />

      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="page-title">Register</h1>

        <div className="mb-3">
          <Input
            label="Name"
            name="first-name"
            required
            minLength={2}
            maxLength={150}
            placeholder="First name"
            field={firstName}
          />
        </div>

        <div className="mb-3">
          <Input
            label="Last name"
            name="last-name"
            required
            minLength={2}
            maxLength={150}
            placeholder="Full last name"
            field={lastName}
          />
        </div>

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

        <Button className="d-block mx-auto" type="submit">
          Register
        </Button>

        <div className="text-center">
          <hr className="mt-4" />
          Aleady have an account? <NavLink to="/login">Login</NavLink>
        </div>
      </form>
    </Auth>
  );
};

export default Register;
