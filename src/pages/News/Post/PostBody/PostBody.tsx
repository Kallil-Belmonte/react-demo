import type { FunctionComponent } from 'react';

import { NavLink } from 'react-router-dom';

import type { Post } from '@/core/services/news/types';
import './PostBody.scss';

type Props = {
  post: Post;
};

const PostBody: FunctionComponent<Props> = ({ post }) => {
  return (
    <section data-component="PostBody">
      <article>
        <h1 className="title text-center">{post.title}</h1>
        <p>{post.body}</p>
      </article>

      <hr className="mt-4" />

      <div className="d-flex justify-content-end">
        <NavLink className="btn btn-light me-3" to={`/edit-post/${post.id}`}>
          Edit
        </NavLink>
        <button
          type="button"
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#delete-post-modal"
        >
          Delete
        </button>
      </div>
    </section>
  );
};

export default PostBody;
