import React from 'react';
import { NavLink } from 'react-router-dom';

import './PostBody.css';

const PostBody = (props) => {
  return (
    <section data-component="PostBody">
      <article>
        <h1 className="title text-center">{props.post.title}</h1>
        <p>{props.post.body}</p>
      </article>
      <hr className="mt-4" />
      <div className="d-flex justify-content-end">
        <button className="btn btn-danger mr-3" type="button" onClick={props.toggleModal}>Delete</button>
        <NavLink className="btn btn-light" to={'/edit-post/' + props.post.id}>Edit</NavLink>
      </div>
    </section>
  );
};

export default PostBody;