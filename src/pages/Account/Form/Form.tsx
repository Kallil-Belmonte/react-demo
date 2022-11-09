import { FunctionComponent, useEffect } from 'react';

import type { AccountFormState } from '@/pages/Account/_files/types';
import { requiredEmail, requiredMin } from '@/shared/files/validations';
import { setUser } from '@/core/redux/reducers/auth';
import { useSelector, useDispatch, useCustomState, useField } from '@/shared/hooks';
import { clearFormMessage, validateForm, setFields } from '@/shared/helpers';
import { AlertDismissible, Input } from '@/shared/components';

const initialState: AccountFormState = {
  formSubmitted: false,
  successMessages: [],
  serverErrors: { email: [], request: [] },
};

const Form: FunctionComponent = () => {
  const [state, setState] = useCustomState<AccountFormState>(initialState);
  const { formSubmitted, successMessages, serverErrors } = state;

  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const firstName = useField({ name: 'first-name', validation: requiredMin(2) });
  const lastName = useField({ name: 'last-name', validation: requiredMin(2) });
  const email = useField({ name: 'email', validation: requiredEmail });

  const setFormData = () => {
    setFields({ fields: [firstName], value: user.firstName });
    setFields({ fields: [lastName], value: user.lastName });
    setFields({ fields: [email], value: user.email });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setState({ formSubmitted: true });

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
      dispatch(
        setUser({ firstName: firstName.value, lastName: lastName.value, email: email.value }),
      );
      setState({ successMessages: ['Account saved successfully.'] });
    }
  };

  const handleClearFormMessage = (field: string, index: number) => {
    clearFormMessage(field, index, state, setState);
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    setFormData();
  }, [user]);

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
            <Input label="First name" field={firstName} formSubmitted={formSubmitted} />
          </div>

          <div className="mb-3">
            <Input label="Last name" field={lastName} formSubmitted={formSubmitted} />
          </div>

          <div className="col mb-3">
            <Input
              type="email"
              label="E-mail address"
              field={email}
              formSubmitted={formSubmitted}
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
          <button className="btn btn-light" type="button" onClick={setFormData}>
            Reset form
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
