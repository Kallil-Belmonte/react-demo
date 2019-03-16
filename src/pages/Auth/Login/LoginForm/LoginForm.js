import React from 'react';
import { NavLink } from 'react-router-dom';

import { Field, reduxForm } from 'redux-form';

import './LoginForm.scss';
import Validations from '../../../../core/Forms/Validations';
import { renderInput, renderCheckbox } from '../../../../core/Forms/Fields';
import AlertDismissible from '../../../../shared/Components/AlertDismissible/AlertDismissible';

let LoginForm = (props) => {
  const {
    handleSubmit,
    valid,
    pristine,
    submitting
  } = props;

  return (
    <form data-component="LoginForm" onSubmit={handleSubmit}>
      <h1 className="page-title">Login</h1>

      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <Field id="email" className="form-control" component={renderInput} type="text" name="email" validate={[Validations.required, Validations.email]}  />

        {props.fieldsErrors.email.map((errorMessage, index) =>
          <AlertDismissible key={index} dismiss={() => props.clearFormMessage('fieldsErrors', 'email', index)} color="danger">
            {errorMessage}
          </AlertDismissible>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <Field id="password" className="form-control" component={renderInput} type="password" name="password" validate={[Validations.required, Validations.minLength3]} />

        {props.fieldsErrors.password.map((errorMessage, index) =>
          <AlertDismissible key={index} dismiss={() => props.clearFormMessage('fieldsErrors', 'password', index)} color="danger">
            {errorMessage}
          </AlertDismissible>
        )}
      </div>

      <div className="form-group">
        <Field className="p-primary" label="Keep logged" component={renderCheckbox} name="keepLogged" />
      </div>

      <button className="btn btn-primary d-block mx-auto" type="submit" disabled={!valid || pristine || submitting}>Login</button>

      <div className="text-center">
        <hr className="mt-4" />
        Don't have an account? <NavLink to="/register">Register</NavLink>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'login'
})(LoginForm);
