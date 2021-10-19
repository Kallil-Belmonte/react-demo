import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { PostState } from '@/pages/News/Post/_files/types';
import { useAppSelector, useAppDispatch, useCustomState } from '@/shared/hooks';
import { setCurrentPost } from '@/core/redux/reducers/news';
import { getPost } from '@/core/services';
import { AppLoader } from '@/shared/components';
import PostBody from './PostBody/PostBody';
import DeletePostModal from './DeletePostModal/DeletePostModal';

const initialState: PostState = {
  isLoading: true,
};

const Post = () => {
  const { currentPost } = useAppSelector(state => state.news);
  const dispatch = useAppDispatch();

  const { id = '' } = useParams<{ id?: string }>();

  const [state, setState] = useCustomState<PostState>(initialState);
  const { isLoading } = state;

  const getCurrentPost = async () => {
    try {
      const post = await getPost(id);
      dispatch(setCurrentPost(post));
    } catch (error) {
      console.error(error);
    } finally {
      setState({ isLoading: false });
    }
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    getCurrentPost();
  }, []);

  return (
    <main data-component="Post">
      <AppLoader isLoading={isLoading} />

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
