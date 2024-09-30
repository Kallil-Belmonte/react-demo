import { type FunctionComponent, useState, useEffect } from 'react';

import { setUser } from '@/core/redux/reducers/auth';
import { clearMessage } from '@/shared/helpers';
import { useSelector, useDispatch, useField } from '@/shared/hooks';
import { Alert, Input, Button } from '@/shared/components';
import './Form.scss';

const Form: FunctionComponent = () => {
  const [successMessages, setSuccessMessages] = useState<string[]>([]);

  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const firstName = useField();
  const lastName = useField();
  const email = useField();

  const setFormData = () => {
    firstName.setValue(user.firstName);
    lastName.setValue(user.lastName);
    email.setValue(user.email);
  };

  const handleChangeEmail: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.target as HTMLInputElement;

    if (value === 'john.doe@gmail.com') {
      email.ref.current.setCustomValidity('This e-mail already exists.');
    } else if (value === 'demo@demo.com') {
      email.ref.current.setCustomValidity('An error occurred, please try again later.');
    } else {
      email.ref.current.setCustomValidity('');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(setUser({ firstName: firstName.value, lastName: lastName.value, email: email.value }));
    setSuccessMessages(['Account saved successfully.']);
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    setFormData();
  }, [user]);

  return (
    <div data-component="Form" className="row">
      <div className="col-md-6 offset-md-3">
        <form onSubmit={handleSubmit}>
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

          <div className="col mb-3">
            <Input
              icon="Email"
              label="E-mail"
              type="email"
              name="email"
              required
              placeholder="Enter your e-mail"
              field={email}
              onChange={handleChangeEmail}
            />
          </div>

          {successMessages.map((errorMessage, index) => (
            <Alert
              key={errorMessage}
              status="success"
              onClose={() => clearMessage(setSuccessMessages, index)}
            >
              {errorMessage}
            </Alert>
          ))}

          <footer>
            <Button type="submit">Save</Button>
            <Button variant="base" onClick={setFormData}>
              Reset form
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default Form;
