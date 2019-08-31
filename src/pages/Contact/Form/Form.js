import React from 'react';

import { Field, reduxForm } from 'redux-form';

import Validations from '../../../core/Forms/Validations';
import { renderInput, renderSelect, renderCheckbox, renderRadioButton } from '../../../core/Forms/Fields';
import AlertDismissible from '../../../shared/Components/AlertDismissible/AlertDismissible';

const Form = (props) => {
  const {
    handleSubmit,
    valid,
    pristine,
    reset,
    submitting,
  } = props;

  return (
    <form data-component="ContactForm" onSubmit={handleSubmit}>
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

      <div className="form-row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="firstName">First name</label>
            <Field id="firstName" className="form-control" component={renderInput} type="text" name="firstName" validate={[Validations.required, Validations.minLength3]} />
          </div>
        </div>

        <div className="col">
          <div className="form-group">
            <label htmlFor="lastName">Last name</label>
            <Field id="lastName" className="form-control" component={renderInput} type="text" name="lastName" validate={[Validations.required]} />
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <Field id="email" className="form-control" component={renderInput} type="email" name="email" validate={[Validations.required, Validations.email]} />
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
        <div className="col">
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
  form: 'contact',
})(Form);
