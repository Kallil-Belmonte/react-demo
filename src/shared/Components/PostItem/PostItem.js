import React from 'react';
import { NavLink } from 'react-router-dom';

import './PostItem.css';
import Utils from '../../Utils/Utils';

const PostItem = (props) => {
  let postImage = <div className="img-placeholder">Não há imagem para esse post</div>;

  if (props.image) {
    postImage = (
      <img className="img-fluid" src={props.image} alt="Capa" />
    );
  }

  return (
    <div data-component="PostItem">
      {postImage}
      <article>
        <h3 className="title">{props.title}</h3>
        <p className="mb-0">{props.body ? Utils.limitWords(props.body, 8) + '...' : null}</p>
        <NavLink className="btn btn-primary mt-3" to={'/post/' + props.id}>Read more</NavLink>
      </article>
    </div>
  );
};

export default PostItem;
