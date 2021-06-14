import React, { Fragment, useReducer, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import axios, { ENDPOINTS } from 'core/API/API';
import * as actionCreators from 'core/Redux/Actions/ActionCreators';
import Reducer from 'core/Hooks/Reducer';
import * as Helpers from 'shared/Helpers';
import Loader from 'shared/Components/Loader/Loader';
import './Form.scss';

const { Group, Label, Control } = Form;
const { blog } = ENDPOINTS;
const { setFieldClassName, getFieldErrorMessage } = Helpers;

const initialState = {
  isLoading: false,
};

const EditPostForm = ({ history, match, currentPost, dispatchSetCurrentPost }) => {
  const { id } = match.params;

  const { register, formState, setValue, reset, handleSubmit } = useForm();
  const { isDirty, isSubmitting, errors } = formState;

  const [state, setState] = useReducer(Reducer, initialState);
  const { isLoading } = state;

  // SET FORM DATA
  const setFormData = useCallback(() => {
    const { title, body } = currentPost;
    setValue([{ title }, { body }]);
  }, [currentPost]); // eslint-disable-line

  // GET CURRENT POST
  const getCurrentPost = useCallback(async () => {
    try {
      const { data: posts } = await axios.get(`${blog.posts}${id}`);
      dispatchSetCurrentPost(posts);
      setFormData();
    } catch (error) {
      console.error(error);
    } finally {
      setState({ isLoading: false });
    }
  }, []); // eslint-disable-line

  // HANDLE SUBMIT FORM
  const handleSubmitForm = useCallback(async values => {
    setState({ isLoading: true });

    try {
      const { data: posts } = await axios.put(`${blog.posts}${id}`, values);
      dispatchSetCurrentPost(posts);
      history.push(`/post/${id}`);
    } catch (error) {
      console.error(error);
      setState({ isLoading: false });
    }
  }, []); // eslint-disable-line

  // LIFECYCLE HOOKS
  useEffect(() => {
    getCurrentPost();
  }, []); // eslint-disable-line

  return (
    <Fragment>
      <Loader isLoading={isLoading} />

      <Form data-component="EditPostForm" onSubmit={handleSubmit(handleSubmitForm)}>
        <Group controlId="title">
          <Label>Title</Label>
          <Control
            className={setFieldClassName(errors.title)}
            type="text"
            {...register('title', { required: { value: true, message: 'Title is required' } })}
          />
          {getFieldErrorMessage(errors.title)}
        </Group>

        <Group controlId="body">
          <Label>Body</Label>
          <Control
            as="textarea"
            rows="6"
            className={setFieldClassName(errors.body)}
            type="text"
            {...register('body', { required: { value: true, message: 'Body is required' } })}
          />
          {getFieldErrorMessage(errors.body)}
        </Group>

        <Button
          className="mr-2"
          variant="primary"
          type="submit"
          disabled={!isDirty || isSubmitting}
        >
          Edit
        </Button>
        <Button variant="light" disabled={!isDirty || isSubmitting} onClick={reset}>
          Reset form
        </Button>
      </Form>
    </Fragment>
  );
};

//==============================
// REDUX
//==============================

// MAP STATE TO PROPS
const mapStateToProps = state => ({
  currentPost: state.currentPost,
});

// MAP DISPATCH TO PROPS
const mapDispatchToProps = dispatch => ({
  dispatchSetCurrentPost: post => dispatch(actionCreators.setCurrentPost(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditPostForm));
