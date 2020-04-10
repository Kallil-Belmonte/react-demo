import React from 'react';

import { Field, reduxForm } from 'redux-form';
import { Col, Form, Alert, Button } from 'react-bootstrap';

import Validations from 'core/Forms/Validations';
import { renderInput, renderSelect, renderCheckbox, renderRadioButton } from 'core/Forms/Fields';

const { Row, Group, Label } = Form;

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
        <Alert
          key={successMessage}
          variant="success"
          dismissible
          onClose={() => onClearFormMessage('feedbackMessages', 'success', index)}
        >
          {successMessage}
        </Alert>
      )}

      {feedbackMessages.error.map((errorMessage, index) =>
        <Alert
          key={errorMessage}
          variant="danger"
          dismissible
          onClose={() => onClearFormMessage('feedbackMessages', 'error', index)}
        >
          {errorMessage}
        </Alert>
      )}

      <Row>
        <Col>
          <Group controlId="first-name">
            <Label>First name</Label>
            <Field id="first-name" className="form-control" component={renderInput} type="text" name="firstName" validate={[Validations.required, Validations.minLength3]} />
          </Group>
        </Col>

        <Col>
          <Group controlId="last-name">
            <Label>Last name</Label>
            <Field id="last-name" className="form-control" component={renderInput} type="text" name="lastName" validate={[Validations.required]} />
          </Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Group controlId="email">
            <Label>E-mail</Label>
            <Field id="email" className="form-control" component={renderInput} type="email" name="email" validate={[Validations.required, Validations.email]} />
          </Group>
        </Col>

        <Col>
          <Group controlId="telephone">
            <Label>Telephone</Label>
            <Field id="telephone" className="form-control telephone-mask" component={renderInput} type="tel" name="telephone" placeholder="(00) 0000 0000" validate={[Validations.required]} />
          </Group>
        </Col>
      </Row>

      <Group>
        <Field className="p-primary" label="Male" component={renderRadioButton} name="sex" radioValue="male" />
        <Field className="p-primary" label="Female" component={renderRadioButton} name="sex" radioValue="female" />
      </Group>

      <Row>
        <Col>
          <Group controlId="favoriteColor">
            <Label>Favorite color</Label>
            <Field id="favoriteColor" className="form-control" component={renderSelect} name="favoriteColor" options={data.favoriteColors} validate={[Validations.required]} />
          </Group>
        </Col>

        <Col className="mt-4">
          <Field className="p-primary" label="Employed" component={renderCheckbox} name="employed" />
        </Col>
      </Row>

      <Group controlId="message">
        <Label>Message</Label>
        <Field id="message" className="form-control" component="textarea" name="message" rows="3" validate={[Validations.required]} />
      </Group>

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
