import React from 'react';
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form';
import { Row, Col, Form, Alert, Button } from 'react-bootstrap';

import Validations from 'core/Forms/Validations';
import { renderInput } from 'core/Forms/Fields';

const { Group, Label } = Form;

let AccountForm = ({
  fieldsErrors,
  feedbackMessages,
  onClearFormMessage,
  handleSubmit,
  valid,
  pristine,
  reset,
  submitting,
}) => {
  return (
    <Row data-component="AccountForm">
      <Col md={{ span: 6, offset: 3 }}>
        {feedbackMessages.success.map((successMessage, index) =>
          <Alert
            key={successMessage}
            variant="success"
            dismissible onClose={() => onClearFormMessage('feedbackMessages', 'success', index)}
          >
            {successMessage}
          </Alert>
        )}

        {feedbackMessages.error.map((errorMessage, index) =>
          <Alert
            key={errorMessage}
            variant="danger"
            dismissible onClose={() => onClearFormMessage('feedbackMessages', 'error', index)}
          >
            {errorMessage}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Group controlId="first-name">
            <Label>First name</Label>
            <Field id="first-name" className="form-control" component={renderInput} type="text" name="firstName" validate={[Validations.required, Validations.minLength3]} />
          </Group>

          <Group controlId="last-name">
            <Label>Last name</Label>
            <Field id="last-name" className="form-control" component={renderInput} type="text" name="lastName" validate={[Validations.required]} />
          </Group>

          <Group controlId="email">
            <Label>E-mail</Label>
            <Field id="email" className="form-control" component={renderInput} type="email" name="email" validate={[Validations.required, Validations.email]} errors={fieldsErrors.email} />

            {fieldsErrors.email.map((errorMessage, index) =>
              <Alert
                key={errorMessage}
                variant="danger"
                dismissible
                onClose={() => onClearFormMessage('fieldsErrors', 'email', index)}
              >
                {errorMessage}
              </Alert>
            )}
          </Group>

          <Button className="mr-2" variant="primary" type="submit" disabled={!valid || pristine || submitting}>
            Save
          </Button>
          <Button variant="link" disabled={pristine || submitting}>
            Reset form
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

AccountForm = reduxForm({
  form: 'settings',
})(AccountForm);

AccountForm = connect(
  state => ({
    initialValues: state.userData,
  })
)(AccountForm);

export default AccountForm;
