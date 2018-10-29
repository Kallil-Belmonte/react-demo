import React from 'react';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import './LoginForm.css';
import Validations from '../../../../core/Forms/Validations';
import { renderInput, renderCheckbox } from '../../../../core/Forms/Fields';

let LoginForm = (props) => {
  const {
    handleSubmit,
    valid,
    pristine,
    submitting
  } = props;

  return (
    <form id="login-form" onSubmit={handleSubmit}>
      <h1 className="page-title">Login</h1>

      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <Field id="email" className="form-control" component={renderInput} type="text" name="email" validate={[Validations.required, Validations.email]} errors={props.fieldsErrors.email} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <Field id="password" className="form-control" component={renderInput} type="password" name="password" validate={[Validations.required]} errors={props.fieldsErrors.password} />
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
