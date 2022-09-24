import { useEffect } from 'react';

import { AccountFormState } from '@/pages/Account/_files/types';
import { requiredEmail, requiredMin } from '@/shared/files/validations';
import { setUser } from '@/core/redux/reducers/auth';
import { useSelector, useDispatch, useCustomState, useField } from '@/shared/hooks';
import { clearFormMessage, validateForm, setFields } from '@/shared/helpers';
import { AlertDismissible, Input } from '@/shared/components';

const initialState: AccountFormState = {
  isFormSubmitted: false,
  successMessages: [],
  serverErrors: { email: [], request: [] },
};

const Form = () => {
  const [state, setState] = useCustomState<AccountFormState>(initialState);
  const { isFormSubmitted, successMessages, serverErrors } = state;

  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const firstName = useField({ name: 'first-name', validation: requiredMin(2) });
  const lastName = useField({ name: 'last-name', validation: requiredMin(2) });
  const email = useField({ name: 'email', validation: requiredEmail });

  const getUserData = () => {
    console.log(user);
    setFields({ fields: [firstName], value: user.firstName });
    setFields({ fields: [lastName], value: user.lastName });
    setFields({ fields: [email], value: user.email });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setState({ isFormSubmitted: true });

    const isValidForm = validateForm([
      { fields: [firstName, lastName], validation: requiredMin(2) },
      { fields: [email], validation: requiredEmail },
    ]);
    if (!isValidForm) return;

    setState({
      successMessages: initialState.successMessages,
      serverErrors: initialState.serverErrors,
    });

    if (email.value === 'john.doe@email.com') {
      setState({
        serverErrors: {
          email: ['This e-mail already exists.'],
          request: [],
        },
      });
    } else if (email.value === 'demo@demo.com') {
      setState({
        serverErrors: {
          email: [],
          request: ['An error occurred, please try again later.'],
        },
      });
    } else {
      dispatch(setUser({ firstName: user.firstName, lastName: user.lastName, email: user.email }));
      setState({ successMessages: ['Account saved successfully.'] });
    }
  };

  const handleClearFormMessage = (field: string, index: number) => {
    clearFormMessage(field, index, state, setState);
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="row" data-component="Form">
      <div className="col-md-6 offset-md-3">
        {successMessages.map(successMessage => (
          <AlertDismissible
            key={successMessage}
            variant="success"
            onDismiss={() => setState({ successMessages: [] })}
          >
            {successMessage}
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

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Input label="First name" field={firstName} isFormSubmitted={isFormSubmitted} />
          </div>

          <div className="mb-3">
            <Input label="Last name" field={lastName} isFormSubmitted={isFormSubmitted} />
          </div>

          <div className="col mb-3">
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

          <button className="btn btn-primary me-2" type="submit">
            Save
          </button>
          <button className="btn btn-light" type="button" onClick={getUserData}>
            Reset form
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
