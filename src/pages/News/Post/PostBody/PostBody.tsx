import { type FunctionComponent, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import type { Post } from '@/core/services/news/types';
import { deletePost } from '@/core/services';
import { Loader, Button } from '@/shared/components';
import DeletePostModal from '../DeletePostModal/DeletePostModal';
import './PostBody.scss';

type Props = {
  post: Post;
};

const PostBody: FunctionComponent<Props> = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const [openDeletePostModal, setOpenDeletePostModal] = useState(false);

  const navigate = useNavigate();
  const { id = '' } = useParams<{ id?: string }>();

  const handleToggleDeletePostModal = () => {
    setOpenDeletePostModal(prevValue => !prevValue);
  };

  const handleDeletePost = async () => {
    handleToggleDeletePostModal();
    setLoading(true);

    try {
      await deletePost(id);
      navigate('/blog');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Loader loading={loading} />

      <section data-component="PostBody">
        <article>
          <h1 className="title text-center">{post.title}</h1>
          <p>{post.body}</p>
        </article>
        <hr className="mt-4" />
        <div className="d-flex justify-content-end">
          <Button className="me-3" onClick={() => navigate(`/edit-post/${post.id}`)}>
            Edit
          </Button>
          <Button variant="base" onClick={handleToggleDeletePostModal}>
            Delete
          </Button>
        </div>
      </section>

      <DeletePostModal
        open={openDeletePostModal}
        onConfirm={handleDeletePost}
        onCancel={handleToggleDeletePostModal}
      />
    </>
  );
};

export default PostBody;
