import React from 'react';
import { NavLink } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';
import { Form, Alert, Button } from 'react-bootstrap';

import Validations from 'core/Forms/Validations';
import { renderInput } from 'core/Forms/Fields';
import './RegisterForm.scss';

const { Group, Label } = Form;

const RegisterForm = ({
  fieldsErrors,
  onClearFormMessage,
  handleSubmit,
  valid,
  pristine,
  submitting,
}) => {
  return (
    <Form data-component="RegisterForm" onSubmit={handleSubmit}>
      <h1 className="page-title">Register</h1>

      <Group controlId="first-name">
        <Label>First name</Label>
        <Field id="first-name" className="form-control" component={renderInput} type="text" name="firstName" validate={[Validations.required]} />
      </Group>

      <Group controlId="last-name">
        <Label>Last name</Label>
        <Field id="last-name" className="form-control" component={renderInput} type="text" name="lastName" validate={[Validations.required]} />
      </Group>

      <Group controlId="email">
        <Label>E-mail</Label>
        <Field id="email" className="form-control" component={renderInput} type="text" name="email" validate={[Validations.required, Validations.email]} errors={fieldsErrors.email} />

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

      <Group controlId="password">
        <Label>Password</Label>
        <Field id="password" className="form-control" component={renderInput} type="password" name="password" validate={[Validations.required, Validations.minLength3]} errors={fieldsErrors.password} />

        {fieldsErrors.password.map((errorMessage, index) =>
          <Alert
            key={errorMessage}
            variant="danger"
            dismissible
            onClose={() => onClearFormMessage('fieldsErrors', 'password', index)}
          >
            {errorMessage}
          </Alert>
        )}
      </Group>

      <Button
        className="d-block mx-auto"
        variant="primary"
        type="submit"
        disabled={!valid || pristine || submitting}
      >
        Register
      </Button>

      <div className="text-center">
        <hr className="mt-4" />
        Aleady have an account? <NavLink to="/login">Login</NavLink>
      </div>
    </Form>
  );
};

export default reduxForm({
  form: 'register',
})(RegisterForm);
