import { type FunctionComponent, useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import type { Post } from '@/core/services/news/types';
import { setCurrentPost } from '@/core/redux/reducers/news';
import { useSelector, useDispatch, useField } from '@/shared/hooks';
import { getPost, editPost } from '@/core/services';
import { Loader, Input, Textarea, Button } from '@/shared/components';
import './Form.scss';

const Form: FunctionComponent = () => {
  const [loading, setLoading] = useState(false);

  const { currentPost } = useSelector(state => state.news);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id = '' } = useParams<{ id?: string }>();

  const title = useField();
  const body = useField();

  const setFormData = () => {
    title.setValue(currentPost.title);
    body.setValue(currentPost.body);
  };

  const getCurrentPost = async () => {
    try {
      const post = await getPost(id);
      dispatch(setCurrentPost(post));
      setFormData();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
          <Input label="Title" name="title" required minLength={2} field={title} />
        </div>

        <div className="mb-3">
          <Textarea label="Body" name="body" required minLength={2} field={body} />
        </div>

        <Button className="me-2" type="submit">
          Edit
        </Button>
        <Button variant="base" onClick={setFormData}>
          Reset form
        </Button>
      </form>
    </>
  );
};

export default Form;
