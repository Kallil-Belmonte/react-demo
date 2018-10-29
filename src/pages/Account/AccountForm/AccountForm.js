import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form';

// import './AccountForm.css';
import { Alert } from 'reactstrap';
import Validations from '../../../core/Forms/Validations';
import { renderInput } from '../../../core/Forms/Fields';

let AccountForm = (props) => {
  const {
    handleSubmit,
    valid,
    pristine,
    reset,
    submitting
  } = props;

  return (
    <div className="row">
      <div className="offset-md-3 col-md-6">
        {props.feedbackMessages && props.feedbackMessages.success ?
          <Alert color="success">
            {props.feedbackMessages.success}
          </Alert>
        : null}

        {props.feedbackMessages ?
          props.feedbackMessages.error.map((message, index) =>
            <Alert color="danger" key={index}>
              {message}
            </Alert>
          )
        : null}

        <form id="account-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <Field id="first-name" className="form-control" component={renderInput} type="text" name="firstName" placeholder="First name" validate={[Validations.required, Validations.minLength3]} />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <Field id="last-name" className="form-control" component={renderInput} type="text" name="lastName" placeholder="Last name" validate={[Validations.required]} />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <Field id="email" className="form-control" component={renderInput} type="email" name="email" placeholder="E-mail" validate={[Validations.required, Validations.email]} errors={props.fieldsErrors.email} />
          </div>
          <button className="btn btn-primary mr-2" type="submit" disabled={!valid || pristine || submitting}>Save</button>
          <button className="btn btn-light" type="button" disabled={pristine || submitting} onClick={reset}>Reset form</button>
        </form>
      </div>
    </div>
  );
};

AccountForm = reduxForm({
  form: 'settings'
})(AccountForm);

AccountForm = connect(
  state => ({
    initialValues: state.userData
  })
)(AccountForm);

export default AccountForm;
