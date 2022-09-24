import { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Post } from '@/core/services/news/types';
import { EditPostFormState } from '@/pages/News/EditPost/_files/types';
import { requiredMin } from '@/shared/files/validations';
import { setCurrentPost } from '@/core/redux/reducers/news';
import { validateForm, setFields } from '@/shared/helpers';
import { useSelector, useDispatch, useCustomState, useField } from '@/shared/hooks';
import { getPost, editPost } from '@/core/services';
import { Loader, Input } from '@/shared/components';
import './Form.scss';

const initialState: EditPostFormState = {
  isLoading: false,
  isFormSubmitted: false,
};

const Form = () => {
  const [state, setState] = useCustomState<EditPostFormState>(initialState);
  const { isLoading, isFormSubmitted } = state;

  const { currentPost } = useSelector(state => state.news);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id = '' } = useParams<{ id?: string }>();

  const title = useField({ name: 'title', validation: requiredMin(2) });
  const body = useField({ name: 'body', validation: requiredMin(2) });

  const setFormData = (data: Post) => {
    setFields({ fields: [title], value: data.title });
    setFields({ fields: [body], value: data.body });
  };

  const getCurrentPost = async () => {
    try {
      const post = await getPost(id);
      dispatch(setCurrentPost(post));
      setFormData(post);
    } catch (error) {
      console.error(error);
    } finally {
      setState({ isLoading: false });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setState({ isFormSubmitted: true });

    const isValidForm = validateForm([{ fields: [title, body], validation: requiredMin(2) }]);
    if (!isValidForm) return;

    setState({ isLoading: true });

    try {
      const payload: Post = {
        userId: currentPost.userId,
        id: currentPost.userId,
        title: title.value,
        body: body.value,
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
    <>
      <Loader isLoading={isLoading} />

      <form data-component="EditPostForm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <Input label="Title" field={title} isFormSubmitted={isFormSubmitted} />
        </div>

        <div className="mb-3">
          <Input label="Body" field={body} isFormSubmitted={isFormSubmitted} />
        </div>

        <button className="btn btn-primary me-2" type="submit">
          Edit
        </button>
        <button className="btn btn-light" type="button" onClick={() => setFormData(currentPost)}>
          Reset form
        </button>
      </form>
    </>
  );
};

export default Form;
