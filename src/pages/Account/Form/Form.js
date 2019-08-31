import React from 'react';
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form';

import Validations from '../../../core/Forms/Validations';
import { renderInput } from '../../../core/Forms/Fields';
import AlertDismissible from '../../../shared/Components/AlertDismissible/AlertDismissible';

let Form = (props) => {
  const {
    handleSubmit,
    valid,
    pristine,
    reset,
    submitting,
  } = props;

  return (
    <div data-component="AccountForm" className="row">
      <div className="offset-md-3 col-md-6">
        {props.feedbackMessages.success.map((successMessage, index) =>
          <AlertDismissible key={index} dismiss={() => props.clearFormMessage('feedbackMessages', 'success', index)} color="success">
            {successMessage}
          </AlertDismissible>
        )}

        {props.feedbackMessages.error.map((errorMessage, index) =>
          <AlertDismissible key={index} dismiss={() => props.clearFormMessage('feedbackMessages', 'error', index)} color="danger">
            {errorMessage}
          </AlertDismissible>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first-name">First name</label>
            <Field id="first-name" className="form-control" component={renderInput} type="text" name="firstName" validate={[Validations.required, Validations.minLength3]} />
          </div>

          <div className="form-group">
            <label htmlFor="last-name">Last name</label>
            <Field id="last-name" className="form-control" component={renderInput} type="text" name="lastName" validate={[Validations.required]} />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <Field id="email" className="form-control" component={renderInput} type="email" name="email" validate={[Validations.required, Validations.email]} errors={props.fieldsErrors.email} />

            {props.fieldsErrors.email.map((errorMessage, index) =>
              <AlertDismissible key={index} dismiss={() => props.clearFormMessage('fieldsErrors', 'email', index)} color="danger">
                {errorMessage}
              </AlertDismissible>
            )}
          </div>

          <button className="btn btn-primary mr-2" type="submit" disabled={!valid || pristine || submitting}>Save</button>
          <button className="btn btn-light" type="button" disabled={pristine || submitting} onClick={reset}>Reset form</button>
        </form>
      </div>
    </div>
  );
};

Form = reduxForm({
  form: 'settings',
})(Form);

Form = connect(
  state => ({
    initialValues: state.userData,
  })
)(Form);

export default Form;
