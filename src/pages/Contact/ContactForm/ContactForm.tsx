import React, { Fragment, useEffect } from 'react';

import { useForm, Controller } from 'react-hook-form';

import { MOCKY_INSTANCE, ENDPOINTS } from 'core/api';
import { emailRegex } from '@/shared/files/regex';
import { clearFormMessage, getFieldClass, getFieldErrorMessage } from '@/shared/helpers';
import { useCustomState } from '@/shared/hooks';
import AppLoader from '@/shared/components/AppLoader/AppLoader';
import AppAlertDismissible from '@/shared/components/AppAlertDismissible/AppAlertDismissible';

const { Row, Group, Label, Control } = Form;
const { contactForm } = ENDPOINTS;

const initialState = {
  isLoading: true,
  telephone: '',
  favoriteColors: [],
  successMessages: [],
};

const ContactForm = () => {
  const { register, formState, reset, control, handleSubmit } = useForm({
    defaultValues: { sex: 'male' },
  });
  const { isDirty, isSubmitting, errors } = formState;

  const [state, setState] = useCustomState(State, initialState);
  const { isLoading, telephone, favoriteColors, feedbackSuccessMessages } = state;

  const getFormData = async () => {
    try {
      const { data: favoriteColors } = await MOCKY_INSTANCE.get(contactForm.favoriteColors);
      setState({ favoriteColors });
    } catch (error) {
      console.error(error);
    } finally {
      setState({ isLoading: false });
    }
  };

  const handleResetForm = () => {
    setState({ telephone: '' });
    reset();
  };

  const handleSubmitForm = values => {
    console.log('Form submitted:', values);
    setState({ feedbackSuccessMessages: ['Message sent successfully.'] });
    handleResetForm();
  };

  const handleClearFormMessage = (field: string, index: number) => {
    clearFormMessage(field, index, state, setState);
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    getFormData();
  }, []);

  return (
    <Fragment>
      <AppLoader isLoading={isLoading} />

      <form
        data-component="ContactForm"
        className="auth-form"
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        {successMessages.map((successMessage, index) => (
          <AppAlertDismissible
            key={successMessage}
            variant="success"
            onDismiss={() => handleClearFormMessage('successMessage', index)}
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
                minLength: { value: 3, message: 'Must be 3 characters or more' },
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
                minLength: { value: 3, message: 'Must be 3 characters or more' },
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
            <div className="form-check form-check-inline">
              <input
                id="male"
                className="form-check-input"
                type="radio"
                value="male"
                {...register('sex', { required: { value: true, message: 'Sex is required' } })}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                id="female"
                className="form-check-input"
                type="radio"
                value="female"
                {...register('sex', { required: { value: true, message: 'Sex is required' } })}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
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
              {...register('favoriteColor', {
                required: { value: true, message: 'Favorite color is required' },
              })}
            >
              <option selected disabled value="select">
                Select
              </option>
              {favoriteColors.map(favoriteColor => (
                <option key={favoriteColor} value={favoriteColor}>
                  {favoriteColor}
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
          <label className="form-label" htmlFor="">
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
        <button className="btn btn-light" type="button" onClick={handleResetForm}>
          Reset form
        </button>
      </form>
    </Fragment>
  );
};

export default ContactForm;
