import React from 'react';
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form';
import { Form, Button } from 'react-bootstrap';

import Validations from 'core/Forms/Validations';
import { renderInput, renderTextarea } from 'core/Forms/Fields';
import './Form.scss';

let EditPostForm = ({
  handleSubmit,
  valid,
  pristine,
  reset,
  submitting,
}) => {
  return (
    <Form data-component="EditPostForm" onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Field id="title" className="form-control" component={renderInput} type="text" name="title" validate={[Validations.required]} />
      </Form.Group>

      <Form.Group controlId="body">
        <Form.Label>Body</Form.Label>
        <Field id="body" className="form-control" component={renderTextarea} name="body" rows="6" validate={[Validations.required]} />
      </Form.Group>

      <Button className="mr-2" variant="primary" type="submit" disabled={!valid || pristine || submitting}>
        Edit
      </Button>
      <Button variant="light" disabled={pristine || submitting} onClick={reset}>
        Reset form
      </Button>
    </Form>
  );
};

EditPostForm = reduxForm({
  form: 'editPost',
})(EditPostForm);

EditPostForm = connect(
  state => ({
    initialValues: state.currentPost,
  })
)(EditPostForm);

export default EditPostForm;
