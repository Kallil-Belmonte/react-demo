import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from 'react-bootstrap';

import './PostBody.scss';

const PostBody = ({ post, onOpenModal }) => {
  return (
    <section data-component="PostBody">
      <article>
        <h1 className="title text-center">{post.title}</h1>
        <p>{post.body}</p>
      </article>
      <hr className="mt-4" />
      <div className="d-flex justify-content-end">
        <Button className="mr-3" variant="danger" onClick={() => onOpenModal()}>Delete</Button>
        <NavLink className="btn btn-light" to={`/edit-post/${post.id}`}>Edit</NavLink>
      </div>
    </section>
  );
};

export default PostBody;
