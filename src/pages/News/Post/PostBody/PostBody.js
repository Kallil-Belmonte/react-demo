import React from 'react';
import { NavLink } from 'react-router-dom';

import './PostBody.scss';

const PostBody = ({ data, onToggleModal }) => {
  return (
    <section data-component="PostBody">
      <article>
        <h1 className="title text-center">{data.title}</h1>
        <p>{data.body}</p>
      </article>
      <hr className="mt-4" />
      <div className="d-flex justify-content-end">
        <button className="btn btn-danger mr-3" type="button" onClick={() => onToggleModal()}>Delete</button>
        <NavLink className="btn btn-light" to={'/edit-post/' + data.id}>Edit</NavLink>
      </div>
    </section>
  );
};

export default PostBody;
