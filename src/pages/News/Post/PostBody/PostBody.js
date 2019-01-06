import React from 'react';
import { NavLink } from 'react-router-dom';

import './PostBody.scss';

const PostBody = (props) => {
  return (
    <section data-component="PostBody">
      <article>
        <h1 className="title text-center">{props.data.title}</h1>
        <p>{props.data.body}</p>
      </article>
      <hr className="mt-4" />
      <div className="d-flex justify-content-end">
        <button className="btn btn-danger mr-3" type="button" onClick={props.toggleModal}>Delete</button>
        <NavLink className="btn btn-light" to={'/edit-post/' + props.data.id}>Edit</NavLink>
      </div>
    </section>
  );
};

export default PostBody;
