import { type FunctionComponent, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import type { PostState } from '@/pages/News/Post/_files/types';
import { useSelector, useDispatch, useCustomState } from '@/shared/hooks';
import { setCurrentPost } from '@/core/redux/reducers/news';
import { getPost } from '@/core/services';
import { Loader } from '@/shared/components';
import PostBody from './PostBody/PostBody';
import DeletePostModal from './DeletePostModal/DeletePostModal';

const initialState: PostState = {
  loading: true,
};

const Post: FunctionComponent = () => {
  const { currentPost } = useSelector(state => state.news);
  const dispatch = useDispatch();

  const { id = '' } = useParams<{ id?: string }>();

  const [state, setState] = useCustomState<PostState>(initialState);
  const { loading } = state;

  const getCurrentPost = async () => {
    try {
      const post = await getPost(id);
      dispatch(setCurrentPost(post));
    } catch (error) {
      console.error(error);
    } finally {
      setState({ loading: false });
    }
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    getCurrentPost();
  }, []);

  return (
    <main data-page="post">
      <Loader loading={loading} />

      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <PostBody post={currentPost} />
          </div>
        </div>
      </div>

      <DeletePostModal />
    </main>
  );
};

export default Post;
