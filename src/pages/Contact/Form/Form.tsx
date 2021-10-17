import React, { Fragment, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { ContactFormState } from '@/pages/Contact/_files/types';
import { emailRegex } from '@/shared/files/regex';
import { getFieldClass, getFieldErrorMessage } from '@/shared/helpers';
import { useCustomState } from '@/shared/hooks';
import { getFavoriteColors } from '@/core/services';
import AppLoader from '@/shared/components/AppLoader/AppLoader';
import AppAlertDismissible from '@/shared/components/AppAlertDismissible/AppAlertDismissible';

const initialState: ContactFormState = {
  isLoading: true,
  favoriteColors: [],
  successMessages: [],
};

const Form = () => {
  const { register, formState, reset, handleSubmit } = useForm();
  const { errors } = formState;

  const [state, setState] = useCustomState<ContactFormState>(initialState);
  const { isLoading, favoriteColors, successMessages } = state;

  const setFavoriteColors = async () => {
    try {
      const response = await getFavoriteColors();
      setState({ favoriteColors: response });
    } catch (error) {
      console.error(error);
    } finally {
      setState({ isLoading: false });
    }
  };

  const handleSubmitForm = (values: any) => {
    console.log('Form submitted:', values);
    setState({ successMessages: ['Message sent successfully.'] });
    reset();
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    setFavoriteColors();
  }, []);

  return (
    <Fragment>
      <AppLoader isLoading={isLoading} />

      <form data-component="Form" className="auth-form" onSubmit={handleSubmit(handleSubmitForm)}>
        {successMessages.map(successMessage => (
          <AppAlertDismissible
            key={successMessage}
            variant="success"
            onDismiss={() => setState({ successMessages: [] })}
          >
            {successMessage}
          </AppAlertDismissible>
        ))}

        <div className="row">
          <div className="col mb-3">
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

          <div className="col mb-3">
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
        </div>

        <div className="row">
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

          <div className="col mb-3">
            <label className="form-label" htmlFor="telephone">
              Telephone
            </label>
            <input
              id="telephone"
              className={getFieldClass(errors.telephone)}
              type="text"
              {...register('telephone', {
                required: { value: true, message: 'Telephone is required' },
              })}
            />
            {getFieldErrorMessage(errors.telephone)}
          </div>
        </div>

        <div className="row">
          <div className="col mb-3">
            <div className={`form-check form-check-inline ${errors.sex ? 'is-invalid' : ''}`}>
              <input
                id="male"
                className={`form-check-input ${errors.sex ? 'is-invalid' : ''}`}
                type="radio"
                value="male"
                {...register('sex', { required: { value: true, message: 'Sex is required' } })}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className={`form-check form-check-inline ${errors.sex ? 'is-invalid' : ''}`}>
              <input
                id="female"
                className={`form-check-input ${errors.sex ? 'is-invalid' : ''}`}
                type="radio"
                value="female"
                {...register('sex', { required: { value: true, message: 'Sex is required' } })}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
            {getFieldErrorMessage(errors.sex)}
          </div>
        </div>

        <div className="row">
          <div className="col mb-3">
            <label className="form-label" htmlFor="favorite-color">
              Favorite color
            </label>
            <select
              id="favorite-color"
              className={getFieldClass(errors.favoriteColor)}
              aria-label="Favorite color"
              defaultValue=""
              {...register('favoriteColor', {
                required: { value: true, message: 'Favorite color is required' },
              })}
            >
              <option disabled value="">
                Select
              </option>
              {favoriteColors.map(({ text, value }) => (
                <option key={value} value={value}>
                  {text}
                </option>
              ))}
            </select>
            {getFieldErrorMessage(errors.favoriteColor)}
          </div>
          <div className="col mt-4">
            <div className="form-check">
              <input
                id="employed"
                className="form-check-input"
                type="checkbox"
                {...register('employed')}
              />
              <label className="form-check-label" htmlFor="employed">
                Employed
              </label>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            className={getFieldClass(errors.message)}
            rows={3}
            {...register('message', { required: { value: true, message: 'Message is required' } })}
          />
          {getFieldErrorMessage(errors.message)}
        </div>

        <button className="btn btn-primary me-2" type="submit">
          Send
        </button>
        <button className="btn btn-light" type="button" onClick={() => reset()}>
          Reset form
        </button>
      </form>
    </Fragment>
  );
};

export default Form;
