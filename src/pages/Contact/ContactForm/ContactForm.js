import React, { Fragment, useReducer, useCallback, useEffect } from 'react';

import { Col, Form, Alert, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

import { MOCKY_INSTANCE, ENDPOINTS } from 'core/API/API';
import Reducer from 'core/Hooks/Reducer';
import { emailPattern } from 'shared/Files/Regex';
import * as Helpers from 'shared/Helpers';
import Loader from 'shared/Components/Loader/Loader';

const { Row, Group, Label, Control } = Form;
const { contactForm } = ENDPOINTS;
const { setFieldClassName, getFieldErrorMessage, removeItemsFromArray } = Helpers;

const initialState = {
  isLoading: true,
  favoriteColors: [],
  feedbackSuccessMessages: [],
  feedbackErrorMessages: [],
};

const ContactForm = () => {
  const { register, formState, errors, reset, handleSubmit } = useForm();
  const { dirty, isSubmitting } = formState;

  const [state, setState] = useReducer(Reducer, initialState);
  const {
    isLoading,
    favoriteColors,
    feedbackSuccessMessages,
    feedbackErrorMessages,
  } = state;

  // GET FORM DATA
  const getFormData = useCallback(async () => {
    try {
      const { data: favoriteColors } = await MOCKY_INSTANCE.get(contactForm.favoriteColors);
      setState({ favoriteColors })
    } catch (error) {
      console.error(error);
    } finally {
      setState({ isLoading: false });
    }
  }, []);

  // HANDLE SUBMIT FORM
  const handleSubmitForm = useCallback((values) => {
    console.log('Form submitted:', values);
    setState({ feedbackSuccessMessages: ['Message sent successfully.'] });
    reset();
  }, []); // eslint-disable-line

  // HANDLE CLEAR FORM MESSAGE
  const handleClearFormMessage = useCallback((fieldName, index) => {
    setState({ [fieldName]: removeItemsFromArray(true, state[fieldName], [index]) });
  }, [state]);

  // LIFECYCLE HOOKS
  useEffect(() => {
    getFormData();
  }, []); // eslint-disable-line

  return (
    <Fragment>
      <Loader isLoading={isLoading} />

      <Form data-component="ContactForm" onSubmit={handleSubmit(handleSubmitForm)}>
        {feedbackSuccessMessages.map((successMessage, index) => (
          <Alert
            key={successMessage}
            variant="success"
            dismissible
            onClose={() => handleClearFormMessage('feedbackSuccessMessages', index)}
          >
            {successMessage}
          </Alert>
        ))}

        {feedbackErrorMessages.map((errorMessage, index) => (
          <Alert
            key={errorMessage}
            variant="danger"
            dismissible
            onClose={() => handleClearFormMessage('feedbackErrorMessages', index)}
          >
            {errorMessage}
          </Alert>
        ))}

        <Row>
          <Col>
            <Group controlId="first-name">
              <Label>First name</Label>
              <Control
                className={setFieldClassName(errors.firstName)}
                type="text"
                name="firstName"
                ref={register({
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
                className={setFieldClassName(errors.lastName)}
                type="text"
                name="lastName"
                ref={register({ required: { value: true, message: 'Last name is required' } })}
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
                className={setFieldClassName(errors.email)}
                type="text"
                name="email"
                ref={register({
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
              <InputMask mask="(99) 9999 99999" maskChar={null}>
                {(inputProps) => (
                  <input
                    className={setFieldClassName(errors.telephone)}
                    type="text"
                    name="telephone"
                    placeholder="(00) 0000 00000"
                    ref={register({ required: { value: true, message: 'Telephone is required' } })}
                    {...inputProps}
                  />
                )}
              </InputMask>
              {getFieldErrorMessage(errors.telephone)}
            </Group>
          </Col>
        </Row>

        <Group>
          <div className="pretty p-default p-round">
            <input
              type="radio"
              name="sex"
              value="male"
              ref={register({ required: { value: true, message: 'Sex is required' } })}
            />
            <div className="state p-primary">
              <label>Male</label>
            </div>
          </div>
          <div className="pretty p-default p-round">
            <input
              type="radio"
              name="sex"
              value="female"
              ref={register({ required: { value: true, message: 'Sex is required' } })}
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
              <Control as="select" custom name="favoriteColor" ref={register}>
                {favoriteColors.map((favoriteColor) => (
                  <option key={favoriteColor} value={favoriteColor}>{favoriteColor}</option>
                ))}
              </Control>
            </Group>
          </Col>

          <Col className="mt-4">
            <div className="pretty p-svg p-curve">
              <input type="checkbox" name="employed" ref={register} />
              <div className="state p-primary">
                <svg className="svg svg-icon" viewBox="0 0 20 20">
                  <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style={{stroke: '#FFF', fill: '#FFF'}}></path>
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
            name="message"
            rows="3"
            ref={register({ required: { value: true, message: 'Message is required' } })}
          />
          {getFieldErrorMessage(errors.message)}
        </Group>

        <Button className="mr-2" variant="primary" type="submit" disabled={!dirty || isSubmitting}>
          Send
        </Button>
        <Button variant="light" disabled={!dirty || isSubmitting} onClick={reset}>
          Reset form
        </Button>
      </Form>
    </Fragment>
  );
};

export default ContactForm;
