import { type FunctionComponent, useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import type { Post } from '@/core/services/news/types';
import { setCurrentPost } from '@/core/redux/reducers/news';
import { useSelector, useDispatch, useField } from '@/shared/hooks';
import { getPost, editPost } from '@/core/services';
import { Loader, Input } from '@/shared/components';
import './Form.scss';

const Form: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);

  const { currentPost } = useSelector(state => state.news);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id = '' } = useParams<{ id?: string }>();

  const title = useField();
  const body = useField();

  const setFormData = (data: Post) => {
    // setFields({ fields: [title], value: data.title });
    // setFields({ fields: [body], value: data.body });
  };

  const getCurrentPost = async () => {
    try {
      const post = await getPost(id);
      dispatch(setCurrentPost(post));
      setFormData(post);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const isValidForm = validateForm([{ fields: [title, body], validation: requiredMin(2) }]);
    // if (!isValidForm) return;

    setLoading(true);

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
      setLoading(false);
    }
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    getCurrentPost();
  }, []);

  return (
    <>
      <Loader loading={loading} />

      <form className="edit-post-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          {/* <Input label="Title" field={title} formSubmitted={formSubmitted} /> */}
        </div>

        <div className="mb-3">
          {/* <Input label="Body" field={body} formSubmitted={formSubmitted} /> */}
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
