import { type FunctionComponent, useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from '@/shared/hooks';
import { setCurrentPost } from '@/core/redux/reducers/news';
import { getPost } from '@/core/services';
import { Loader } from '@/shared/components';
import PostBody from './PostBody/PostBody';
import DeletePostModal from './DeletePostModal/DeletePostModal';

const Post: FunctionComponent = () => {
  const { currentPost } = useSelector(state => state.news);
  const dispatch = useDispatch();

  const { id = '' } = useParams<{ id?: string }>();

  const [loading, setLoading] = useState(false);

  const getCurrentPost = async () => {
    try {
      const post = await getPost(id);
      dispatch(setCurrentPost(post));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    getCurrentPost();
  }, []);

  return (
    <main data-page="Post">
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
