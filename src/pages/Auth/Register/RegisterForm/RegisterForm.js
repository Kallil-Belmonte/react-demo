import React from 'react';
import { NavLink } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';
import { Form, Alert, Button } from 'react-bootstrap';

import Validations from 'core/Forms/Validations';
import { renderInput } from 'core/Forms/Fields';
import './RegisterForm.scss';

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

      <Form.Group controlId="first-name">
        <Form.Label>First name</Form.Label>
        <Field id="first-name" className="form-control" component={renderInput} type="text" name="firstName" validate={[Validations.required]} />
      </Form.Group>

      <Form.Group controlId="last-name">
        <Form.Label>Last name</Form.Label>
        <Field id="last-name" className="form-control" component={renderInput} type="text" name="lastName" validate={[Validations.required]} />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>E-mail</Form.Label>
          <Field id="email" className="form-control" component={renderInput} type="text" name="email" validate={[Validations.required, Validations.email]} errors={fieldsErrors.email} />

          {fieldsErrors.email.map((errorMessage, index) =>
            <Alert key={index} variant="danger" dismissible onClose={() => onClearFormMessage('fieldsErrors', 'email', index)}>
              {errorMessage}
            </Alert>
          )}
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
          <Field id="password" className="form-control" component={renderInput} type="password" name="password" validate={[Validations.required, Validations.minLength3]} errors={fieldsErrors.password} />

          {fieldsErrors.password.map((errorMessage, index) =>
            <Alert key={index} variant="danger" dismissible onClose={() => onClearFormMessage('fieldsErrors', 'password', index)}>
              {errorMessage}
            </Alert>
          )}
      </Form.Group>

      <Button
        className="d-block mx-auto"
        variant="primary"
        type="submit"
        disabled={!valid || pristine || submitting}
      >
        Submit
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
