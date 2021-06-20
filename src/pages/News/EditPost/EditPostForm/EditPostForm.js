import React, { Fragment, useReducer, useEffect, useCallback } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import axios, { ENDPOINTS } from 'core/api';
import * as Actions from 'core/redux/actions';
import State from 'core/hooks/State';
import { getFieldClass, getFieldErrorMessage } from 'shared/helpers';
import Loader from 'shared/components/Loader/Loader';
import './Form.scss';

const { keys } = Object;

const { Group, Label, Control } = Form;
const { blog } = ENDPOINTS;

const initialState = {
  isLoading: false,
};

const EditPostForm = ({ history, match, currentPost, dispatchSetCurrentPost }) => {
  const { id } = match.params;

  const { register, formState, getValues, setValue, reset, handleSubmit } = useForm();
  const { isDirty, isSubmitting, errors } = formState;

  const [state, setState] = useReducer(State, initialState);
  const { isLoading } = state;

  const setFormData = useCallback(() => {
    keys(getValues()).forEach(key => setValue(key, currentPost[key]));
  }, [getValues, setValue, currentPost]);

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
  }, [id, dispatchSetCurrentPost, setFormData]);

  const handleSubmitForm = useCallback(
    async values => {
      setState({ isLoading: true });

      try {
        const { data: posts } = await axios.put(`${blog.posts}${id}`, values);
        dispatchSetCurrentPost(posts);
        history.push(`/post/${id}`);
      } catch (error) {
        console.error(error);
        setState({ isLoading: false });
      }
    },
    [id, dispatchSetCurrentPost, history],
  );

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
            className={getFieldClass(errors.title)}
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
            className={getFieldClass(errors.body)}
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
        <Button variant="light" disabled={!isDirty || isSubmitting} onClick={() => reset()}>
          Reset form
        </Button>
      </Form>
    </Fragment>
  );
};

const mapStateToProps = ({ currentPost }) => ({
  currentPost,
});

const mapDispatchToProps = dispatch => ({
  dispatchSetCurrentPost: post => dispatch(Actions.setCurrentPost(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditPostForm));
