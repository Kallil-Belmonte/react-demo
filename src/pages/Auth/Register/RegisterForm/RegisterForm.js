import React from 'react';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import './RegisterForm.css';
import Validations from '../../../../core/Forms/Validations';
import { renderInput } from '../../../../core/Forms/Fields';

let RegisterForm = (props) => {
  const {
    handleSubmit,
    valid,
    pristine,
    submitting
  } = props;

  return (
    <form data-component="RegisterForm" onSubmit={handleSubmit}>
      <h1 className="page-title">Register</h1>

      <div className="form-group">
        <label htmlFor="first-name">First name</label>
        <Field id="first-name" className="form-control" component={renderInput} type="text" name="firstName" validate={[Validations.required]} />
      </div>
      <div className="form-group">
        <label htmlFor="last-name">Last name</label>
        <Field id="last-name" className="form-control" component={renderInput} type="text" name="lastName" validate={[Validations.required]} />
      </div>
      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <Field id="email" className="form-control" component={renderInput} type="text" name="email" validate={[Validations.required, Validations.email]} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <Field id="password" className="form-control" component={renderInput} type="password" name="password" validate={[Validations.required, Validations.minLength3]} />
      </div>

      <button className="btn btn-primary d-block mx-auto" type="submit" disabled={!valid || pristine || submitting}>Submit</button>

      <div className="text-center">
        <hr className="mt-4" />
        Aleady have an account? <NavLink to="/login">Login</NavLink>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'register'
})(RegisterForm);
