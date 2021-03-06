import React, { useReducer, useCallback, useEffect } from 'react';

import { connect } from 'react-redux';
import { Row, Col, Form, Alert, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import * as Actions from 'core/redux/actions';
import State from 'core/hooks/State';
import { emailPattern } from 'shared/files/regex';
import { getFieldClass, getFieldErrorMessage, removeItemsFromArray } from 'shared/helpers';

const { keys } = Object;

const { Group, Label, Control } = Form;

const initialState = {
  emailErrors: [],
  feedbackSuccessMessages: [],
  feedbackErrorMessages: [],
};

const AccountForm = ({ userData, dispatchEditAccount }) => {
  const { register, formState, getValues, setValue, reset, handleSubmit } = useForm();
  const { isDirty, isSubmitting, errors } = formState;

  const [state, setState] = useReducer(State, initialState);
  const { emailErrors, feedbackSuccessMessages, feedbackErrorMessages } = state;

  const getUserData = useCallback(() => {
    keys(getValues()).forEach(key => setValue(key, userData[key]));
  }, [getValues, setValue, userData]);

  const handleSubmitForm = useCallback(
    async values => {
      if (values.email === 'john.doe@email.com') {
        setState({ emailErrors: ['This e-mail already exists.'] });
      } else if (values.email === 'demo@demo.com') {
        setState({ feedbackErrorMessages: ['An error occurred, please try again later.'] });
      } else {
        dispatchEditAccount(values);
        setState({ feedbackSuccessMessages: ['Account saved successfully.'] });
      }
    },
    [dispatchEditAccount],
  );

  const handleClearFormMessage = useCallback(
    (field, index) => {
      setState({ [field]: removeItemsFromArray(true, state[field], [index]) });
    },
    [state],
  );

  // LIFECYCLE HOOKS
  useEffect(() => {
    getUserData();
  }, []); // eslint-disable-line

  return (
    <Row data-component="AccountForm">
      <Col md={{ span: 6, offset: 3 }}>
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

        {feedbackErrorMessages.map((message, index) => (
          <Alert
            key={message}
            variant="danger"
            dismissible
            onClose={() => handleClearFormMessage('feedbackErrorMessages', index)}
          >
            {message}
          </Alert>
        ))}

        <Form onSubmit={handleSubmit(handleSubmitForm)}>
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

            {emailErrors.map((errorMessage, index) => (
              <Alert
                key={errorMessage}
                variant="danger"
                dismissible
                onClose={() => handleClearFormMessage('emailErrors', emailErrors, index)}
              >
                {errorMessage}
              </Alert>
            ))}
          </Group>

          <Button
            className="mr-2"
            variant="primary"
            type="submit"
            disabled={!isDirty || isSubmitting}
          >
            Save
          </Button>
          <Button variant="light" disabled={!isDirty || isSubmitting} onClick={() => reset()}>
            Reset form
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ userData }) => ({
  userData,
});

const mapDispatchToProps = dispatch => ({
  dispatchEditAccount: userData => dispatch(Actions.editAccount(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountForm);
