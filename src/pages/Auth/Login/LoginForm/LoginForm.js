import React from 'react';
import { NavLink } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';
import { Form, Alert, Button } from 'react-bootstrap';

import Validations from 'core/Forms/Validations';
import { renderInput, renderCheckbox } from 'core/Forms/Fields';
import './LoginForm.scss';

const LoginForm = ({
  fieldsErrors,
  onClearFormMessage,
  handleSubmit,
  valid,
  pristine,
  submitting,
}) => {
  return (
    <Form data-component="LoginForm" onSubmit={handleSubmit}>
      <h1 className="page-title">Login</h1>

      <Form.Group controlId="email">
        <Form.Label>E-mail</Form.Label>
        <Field id="email" className="form-control" component={renderInput} type="text" name="email" validate={[Validations.required, Validations.email]} />

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
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Field id="password" className="form-control" component={renderInput} type="password" name="password" validate={[Validations.required, Validations.minLength3]} />

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
      </Form.Group>

      <Form.Group>
        <Field className="p-primary" label="Keep logged" component={renderCheckbox} name="keepLogged" />
      </Form.Group>

      <Button
        className="d-block mx-auto"
        variant="primary"
        type="submit"
        disabled={!valid || pristine || submitting}
      >
        Login
      </Button>

      <div className="text-center">
        <hr className="mt-4" />
        Don't have an account? <NavLink to="/register">Register</NavLink>
      </div>
    </Form>
  );
};

export default reduxForm({
  form: 'login',
})(LoginForm);
