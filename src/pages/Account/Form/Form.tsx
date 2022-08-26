import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { AuthState } from '@/core/redux/reducers/auth';
import { AccountFormState } from '@/pages/Account/_files/types';
import { setUser } from '@/core/redux/reducers/auth';
import { useSelector, useDispatch, useCustomState } from '@/shared/hooks';
import { emailRegex } from '@/shared/files/regex';
import { clearFormMessage, getFieldClass, getFieldErrorMessage } from '@/shared/helpers';
import { AlertDismissible } from '@/shared/components';

const { keys } = Object;

const initialState: AccountFormState = {
  successMessages: [],
  serverErrors: { email: [], request: [] },
};

const Form = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const { register, formState, getValues, setValue, reset, handleSubmit } = useForm();
  const { errors } = formState;

  const [state, setState] = useCustomState<AccountFormState>(initialState);
  const { successMessages, serverErrors } = state;

  const getUserData = () => {
    keys(getValues()).forEach(key => setValue(key, (user as any)[key]));
  };

  const handleSubmitForm = async (values: AuthState['user']) => {
    setState(initialState);

    if (values.email === 'john.doe@email.com') {
      setState({
        serverErrors: {
          email: ['This e-mail already exists.'],
          request: [],
        },
      });
    } else if (values.email === 'demo@demo.com') {
      setState({
        serverErrors: {
          email: [],
          request: ['An error occurred, please try again later.'],
        },
      });
    } else {
      dispatch(setUser(values));
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

        <form onSubmit={handleSubmit(handleSubmitForm)}>
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

          <div className="col mb-3">
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
          <button className="btn btn-light" type="button" onClick={() => reset()}>
            Reset form
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
