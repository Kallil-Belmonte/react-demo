import React from 'react';
import { Field, reduxForm } from 'redux-form';

// import './ContactForm.css';
import { Alert } from 'reactstrap';
import Validations from '../../../core/Forms/Validations';
import { renderInput, renderSelect, renderCheckbox, renderRadioButton } from '../../../core/Forms/Fields';

const ContactForm = (props) => {
  const {
    handleSubmit,
    valid,
    pristine,
    reset,
    submitting
  } = props;

  return (
    <form id="contact-form" onSubmit={handleSubmit}>
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

      <div className="form-row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <Field id="firstName" className="form-control" component={renderInput} type="text" name="firstName" placeholder="First name" validate={[Validations.required, Validations.minLength3]} />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <Field id="lastName" className="form-control" component={renderInput} type="text" name="lastName" placeholder="Last name" validate={[Validations.required]} />
          </div>
        </div>
      </div>
      <div className="form-row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <Field id="email" className="form-control" component={renderInput} type="email" name="email" placeholder="E-mail" validate={[Validations.required, Validations.email]} />
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <label htmlFor="telephone">Telephone</label>
            <Field id="telephone" className="form-control telephone-mask" component={renderInput} type="tel" name="telephone" placeholder="(00) 0000 0000" validate={[Validations.required]} />
          </div>
        </div>
      </div>
      <div className="form-group">
        <Field className="p-primary" label="Male" component={renderRadioButton} name="sex" radioValue="male" />
        <Field className="p-primary" label="Female" component={renderRadioButton} name="sex" radioValue="female" />
      </div>
      <div className="form-row">
        <div className="col-md-8">
          <div className="form-group">
            <label htmlFor="favoriteColor">Favorite color</label>
            <Field id="favoriteColor" className="form-control" component={renderSelect} name="favoriteColor" options={props.data.favoriteColors} validate={[Validations.required]} />
          </div>
        </div>
        <div className="col mt-4">
          <Field className="p-primary" label="Employed" component={renderCheckbox} name="employed" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <Field id="message" className="form-control" component="textarea" name="message" rows="3" validate={[Validations.required]} />
      </div>

      <button className="btn btn-primary mr-2" type="submit" disabled={!valid || pristine || submitting}>Send</button>
      <button className="btn btn-light" type="button" disabled={pristine || submitting} onClick={reset}>Reset form</button>
    </form>
  );
};

export default reduxForm({
  form: 'contact'
})(ContactForm);
