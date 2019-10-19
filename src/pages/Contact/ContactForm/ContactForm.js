import React from 'react';

import { Field, reduxForm } from 'redux-form';
import { Col, Form, Alert, Button } from 'react-bootstrap';

import Validations from 'core/Forms/Validations';
import { renderInput, renderSelect, renderCheckbox, renderRadioButton } from 'core/Forms/Fields';

const ContactForm = ({
  data,
  feedbackMessages,
  onClearFormMessage,
  handleSubmit,
  valid,
  pristine,
  reset,
  submitting,
}) => {
  return (
    <Form data-component="ContactForm" onSubmit={handleSubmit}>
      {feedbackMessages.success.map((successMessage, index) =>
        <Alert key={index} variant="success" dismissible onClose={() => onClearFormMessage('feedbackMessages', 'success', index)}>
          {successMessage}
        </Alert>
      )}

      {feedbackMessages.error.map((errorMessage, index) =>
        <Alert key={index} variant="danger" dismissible onClose={() => onClearFormMessage('feedbackMessages', 'error', index)}>
          {errorMessage}
        </Alert>
      )}

      <Form.Row>
        <Col>
          <Form.Group controlId="first-name">
            <Form.Label>First name</Form.Label>
            <Field id="first-name" className="form-control" component={renderInput} type="text" name="firstName" validate={[Validations.required, Validations.minLength3]} />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group controlId="last-name">
            <Form.Label>Last name</Form.Label>
            <Field id="last-name" className="form-control" component={renderInput} type="text" name="lastName" validate={[Validations.required]} />
          </Form.Group>
        </Col>
      </Form.Row>

      <Form.Row>
        <Col>
          <Form.Group controlId="email">
            <Form.Label>E-mail</Form.Label>
            <Field id="email" className="form-control" component={renderInput} type="email" name="email" validate={[Validations.required, Validations.email]} />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group controlId="telephone">
            <Form.Label>Telephone</Form.Label>
            <Field id="telephone" className="form-control telephone-mask" component={renderInput} type="tel" name="telephone" placeholder="(00) 0000 0000" validate={[Validations.required]} />
          </Form.Group>
        </Col>
      </Form.Row>

      <Form.Group>
        <Field className="p-primary" label="Male" component={renderRadioButton} name="sex" radioValue="male" />
        <Field className="p-primary" label="Female" component={renderRadioButton} name="sex" radioValue="female" />
      </Form.Group>

      <Form.Row>
        <Col>
          <Form.Group controlId="favoriteColor">
            <Form.Label>Favorite color</Form.Label>
            <Field id="favoriteColor" className="form-control" component={renderSelect} name="favoriteColor" options={data.favoriteColors} validate={[Validations.required]} />
          </Form.Group>
        </Col>

        <Col className="mt-4">
          <Field className="p-primary" label="Employed" component={renderCheckbox} name="employed" />
        </Col>
      </Form.Row>

      <Form.Group controlId="message">
        <Form.Label>Message</Form.Label>
        <Field id="message" className="form-control" component="textarea" name="message" rows="3" validate={[Validations.required]} />
      </Form.Group>

      <Button className="mr-2" variant="primary" type="submit" disabled={!valid || pristine || submitting}>
        Send
      </Button>
      <Button variant="light" disabled={pristine || submitting} onClick={reset}>
        Reset form
      </Button>
    </Form>
  );
};

export default reduxForm({
  form: 'contact',
})(ContactForm);
