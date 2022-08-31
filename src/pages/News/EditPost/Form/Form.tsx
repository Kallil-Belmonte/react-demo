import React, { Fragment, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

import { Post } from '@/core/services/news/types';
import { EditPostFormState } from '@/pages/News/EditPost/_files/types';
import { setCurrentPost } from '@/core/redux/reducers/news';
import { getFieldClass, getFieldErrorMessage } from '@/shared/helpers';
import { useSelector, useDispatch, useCustomState } from '@/shared/hooks';
import { getPost, editPost } from '@/core/services';
import { Loader } from '@/shared/components';
import './Form.scss';

const { keys } = Object;

type PostToEdit = Pick<Post, 'title' | 'body'>;

const initialState: EditPostFormState = {
  isLoading: false,
};

const Form = () => {
  const { currentPost } = useSelector(state => state.news);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id = '' } = useParams<{ id?: string }>();

  const { register, formState, getValues, setValue, reset, handleSubmit } = useForm<PostToEdit>();
  const { errors } = formState;

  const [state, setState] = useCustomState<EditPostFormState>(initialState);
  const { isLoading } = state;

  const setFormData = () => {
    const currentPostKeys = keys(getValues()) as ('title' | 'body')[];
    currentPostKeys.forEach(key => setValue(key, currentPost[key]));
  };

  const getCurrentPost = async () => {
    try {
      const post = await getPost(id);
      dispatch(setCurrentPost(post));
      setFormData();
    } catch (error) {
      console.error(error);
    } finally {
      setState({ isLoading: false });
    }
  };

  const handleSubmitForm = async (values: PostToEdit) => {
    setState({ isLoading: true });

    try {
      const payload: Post = {
        userId: currentPost.userId,
        id: currentPost.userId,
        title: values.title,
        body: values.body,
      };

      await editPost(payload);
      dispatch(setCurrentPost(payload));
      navigate(`/post/${id}`);
    } catch (error) {
      console.error(error);
      setState({ isLoading: false });
    }
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    getCurrentPost();
  }, []);

  return (
    <Fragment>
      <Loader isLoading={isLoading} />

      <form data-component="EditPostForm" onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="mb-3">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            className={getFieldClass(errors.title)}
            type="text"
            {...register('title', { required: { value: true, message: 'Title is required' } })}
          />
          {getFieldErrorMessage(errors.title)}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="body">
            Body
          </label>
          <textarea
            id="body"
            className={getFieldClass(errors.body)}
            rows={6}
            {...register('body', { required: { value: true, message: 'Body is required' } })}
          />
          {getFieldErrorMessage(errors.body)}
        </div>

        <button className="btn btn-primary me-2" type="submit">
          Edit
        </button>
        <button className="btn btn-light" type="button" onClick={() => reset()}>
          Reset form
        </button>
      </form>
    </Fragment>
  );
};

export default Form;
