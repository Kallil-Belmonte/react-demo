import React, { Fragment, useReducer, useCallback, useEffect } from 'react';

import { Col, Form, Alert, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

import { MOCKY_INSTANCE, ENDPOINTS } from 'core/api';
import State from 'core/hooks/State';
import { emailPattern } from 'shared/files/regex';
import { getFieldClass, getFieldErrorMessage, removeItemsFromArray } from 'shared/helpers';
import Loader from 'shared/components/Loader/Loader';

const { Row, Group, Label, Control } = Form;
const { contactForm } = ENDPOINTS;

const initialState = {
  isLoading: true,
  telephone: '',
  favoriteColors: [],
  feedbackSuccessMessages: [],
};

const ContactForm = () => {
  const { register, formState, reset, control, handleSubmit } = useForm({
    defaultValues: { sex: 'male' },
  });
  const { isDirty, isSubmitting, errors } = formState;

  const [state, setState] = useReducer(State, initialState);
  const { isLoading, telephone, favoriteColors, feedbackSuccessMessages } = state;

  // GET FORM DATA
  const getFormData = useCallback(async () => {
    try {
      const { data: favoriteColors } = await MOCKY_INSTANCE.get(contactForm.favoriteColors);
      setState({ favoriteColors });
    } catch (error) {
      console.error(error);
    } finally {
      setState({ isLoading: false });
    }
  }, []);

  // HANDLE RESET FORM
  const handleResetForm = useCallback(() => {
    setState({ telephone: '' });
    reset();
  }, [reset]);

  // HANDLE SUBMIT FORM
  const handleSubmitForm = useCallback(
    values => {
      console.log('Form submitted:', values);
      setState({ feedbackSuccessMessages: ['Message sent successfully.'] });
      handleResetForm();
    },
    [handleResetForm],
  );

  // HANDLE CLEAR FORM MESSAGE
  const handleClearFormMessage = useCallback(
    (field, index) => {
      setState({ [field]: removeItemsFromArray(true, state[field], [index]) });
    },
    [state],
  );

  // LIFECYCLE HOOKS
  useEffect(() => {
    getFormData();
  }, []); // eslint-disable-line

  return (
    <Fragment>
      <Loader isLoading={isLoading} />

      <Form data-component="ContactForm" onSubmit={handleSubmit(handleSubmitForm)}>
        {feedbackSuccessMessages.map((message, index) => (
          <Alert
            key={message}
            variant="success"
            dismissible
            onClose={() => handleClearFormMessage('feedbackSuccessMessages', index)}
          >
            {message}
          </Alert>
        ))}

        <Row>
          <Col>
            <Group controlId="first-name">
              <Label>First name</Label>
              <Control
                className={getFieldClass(errors.firstName)}
                type="text"
                {...register('firstName', {
                  required: { value: true, message: 'First name is required' },
                  minLength: { value: 3, message: 'Must be 3 characters or more' },
                })}
              />
              {getFieldErrorMessage(errors.firstName)}
            </Group>
          </Col>

          <Col>
            <Group controlId="last-name">
              <Label>Last name</Label>
              <Control
                className={getFieldClass(errors.lastName)}
                type="text"
                {...register('lastName', {
                  required: { value: true, message: 'Last name is required' },
                })}
              />
              {getFieldErrorMessage(errors.lastName)}
            </Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Group controlId="email">
              <Label>E-mail</Label>
              <Control
                className={getFieldClass(errors.email)}
                type="text"
                {...register('email', {
                  required: { value: true, message: 'E-mail is required' },
                  pattern: { value: emailPattern, message: 'Invalid e-mail' },
                })}
              />
              {getFieldErrorMessage(errors.email)}
            </Group>
          </Col>

          <Col>
            <Group controlId="telephone">
              <Label>Telephone</Label>
              <Controller
                control={control}
                name="telephone"
                rules={{ required: { value: true, message: 'Telephone is required' } }}
                render={({ field: { name, onChange } }) => (
                  <InputMask
                    type="text"
                    name={name}
                    placeholder="(00) 0000 00000"
                    className={`form-control ${getFieldClass(errors.telephone)}`}
                    mask="(99) 9999 99999"
                    maskChar={null}
                    onChange={e => {
                      setState({ telephone: e.target.value });
                      onChange(e);
                    }}
                    value={telephone}
                  />
                )}
              />
              {getFieldErrorMessage(errors.telephone)}
            </Group>
          </Col>
        </Row>

        <Group>
          <div className="pretty p-default p-round">
            <input
              type="radio"
              value="male"
              {...register('sex', { required: { value: true, message: 'Sex is required' } })}
            />
            <div className="state p-primary">
              <label>Male</label>
            </div>
          </div>
          <div className="pretty p-default p-round">
            <input
              type="radio"
              value="female"
              {...register('sex', { required: { value: true, message: 'Sex is required' } })}
            />
            <div className="state p-primary">
              <label>Female</label>
            </div>
          </div>
          {getFieldErrorMessage(errors.sex)}
        </Group>

        <Row>
          <Col>
            <Group controlId="favoriteColor">
              <Label>Favorite color</Label>
              <Control as="select" custom defaultValue="" {...register('favoriteColor')}>
                <option value="" disabled>
                  Select
                </option>
                {favoriteColors.map(favoriteColor => (
                  <option key={favoriteColor} value={favoriteColor}>
                    {favoriteColor}
                  </option>
                ))}
              </Control>
            </Group>
          </Col>

          <Col className="mt-4">
            <div className="pretty p-svg p-curve">
              <input type="checkbox" {...register('employed')} />
              <div className="state p-primary">
                <svg className="svg svg-icon" viewBox="0 0 20 20">
                  <path
                    d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                    style={{ stroke: '#FFF', fill: '#FFF' }}
                  ></path>
                </svg>
                <label>Employed</label>
              </div>
            </div>
          </Col>
        </Row>

        <Group controlId="message">
          <Label>Message</Label>
          <Control
            as="textarea"
            rows="3"
            {...register('message', { required: { value: true, message: 'Message is required' } })}
          />
          {getFieldErrorMessage(errors.message)}
        </Group>

        <Button
          className="mr-2"
          variant="primary"
          type="submit"
          disabled={!isDirty || isSubmitting}
        >
          Send
        </Button>
        <Button variant="light" disabled={!isDirty || isSubmitting} onClick={handleResetForm}>
          Reset form
        </Button>
      </Form>
    </Fragment>
  );
};

export default ContactForm;
