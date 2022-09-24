import { useNavigate, NavLink } from 'react-router-dom';

import { FormState } from '@/pages/Auth/_files/types';
import { RegisterUserPayload } from '@/core/services/auth/types';
import { AUTH_TOKEN_KEY } from '@/shared/files/consts';
import { requiredEmail, requiredMin } from '@/shared/files/validations';
import { clearFormMessage, validateForm } from '@/shared/helpers';
import { useDispatch, useCustomState, useField } from '@/shared/hooks';
import { registerUser } from '@/core/services';
import { setUser } from '@/core/redux/reducers/auth';
import { AlertDismissible, Loader, Input } from '@/shared/components';
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

const Register = () => {
  const [state, setState] = useCustomState<FormState>(initialState);
  const { isLoading, isFormSubmitted, serverErrors } = state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const firstName = useField({ name: 'first-name', validation: requiredMin(2) });
  const lastName = useField({ name: 'last-name', validation: requiredMin(2) });
  const email = useField({ name: 'email', validation: requiredEmail });
  const password = useField({ name: 'password', validation: requiredMin(3) });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setState({ isFormSubmitted: true });

    const isValidForm = validateForm([
      { fields: [firstName, lastName], validation: requiredMin(2) },
      { fields: [email], validation: requiredEmail },
      { fields: [password], validation: requiredMin(3) },
    ]);
    if (!isValidForm) return;

    setState({
      isLoading: true,
      serverErrors: { email: [], password: [], request: [] },
    });

    try {
      const payload: RegisterUserPayload = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      };

      const user = await registerUser(payload);

      if (email.value === 'demo@demo.com') {
        setState({
          serverErrors: {
            email: ['This e-mail already exists.'],
            password: ['Your password is too weak.'],
            request: [],
          },
        });
      } else {
        sessionStorage.setItem(AUTH_TOKEN_KEY, user.token);
        dispatch(
          setUser({ firstName: user.firstName, lastName: user.lastName, email: user.email }),
        );
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

      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="page-title">Register</h1>

        <div className="mb-3">
          <Input label="First name" field={firstName} isFormSubmitted={isFormSubmitted} />
        </div>

        <div className="mb-3">
          <Input label="Last name" field={lastName} isFormSubmitted={isFormSubmitted} />
        </div>

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
