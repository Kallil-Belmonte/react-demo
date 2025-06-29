import { type FunctionComponent, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { setCurrentPost } from '@/core/redux/reducers/news';
import { getPost } from '@/core/services';
import { Loader } from '@/shared/components';
import { useDispatch, useSelector } from '@/shared/hooks';
import PostBody from './PostBody/PostBody';

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
  }, []); // eslint-disable-line

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
    </main>
  );
};

export default Post;
