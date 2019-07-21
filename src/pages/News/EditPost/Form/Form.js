import React from 'react';
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form';

import './Form.scss';
import Validations from '../../../../core/Forms/Validations';
import { renderInput, renderTextarea } from '../../../../core/Forms/Fields';

let Form = (props) => {
  const {
    handleSubmit,
    valid,
    pristine,
    reset,
    submitting,
  } = props;

  return (
    <form data-component="EditPostForm" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <Field id="title" className="form-control" component={renderInput} type="text" name="title" validate={[Validations.required]} />
      </div>

      <div className="form-group">
        <label htmlFor="body">Body</label>
        <Field id="body" className="form-control" component={renderTextarea} name="body" rows="6" validate={[Validations.required]} />
      </div>

      <button className="btn btn-primary mr-2" type="submit" disabled={!valid || pristine || submitting}>Edit</button>
      <button className="btn btn-light" type="button" disabled={pristine || submitting} onClick={reset}>Reset form</button>
    </form>
  );
};

Form = reduxForm({
  form: 'editPost',
})(Form);

Form = connect(
  state => ({
    initialValues: state.currentPost,
  })
)(Form);

export default Form;
