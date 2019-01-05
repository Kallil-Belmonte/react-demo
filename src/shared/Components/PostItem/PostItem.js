import React from 'react';
import { NavLink } from 'react-router-dom';

import './PostItem.scss';
import Utils from '../../Utils/Utils';

const PostItem = (props) => {
  let postImage = <div className="img-placeholder">Não há imagem para esse post</div>;

  if (props.data.image) {
    postImage = (
      <img className="img-fluid" src={props.data.image} alt="Capa" />
    );
  }

  return (
    <div data-component="PostItem">
      {postImage}
      <article>
        <h3 className="title">{props.data.title}</h3>
        <p className="mb-0">{props.data.body ? Utils.limitWords(props.data.body, 8) + '...' : null}</p>
        <NavLink className="btn btn-primary mt-3" to={'/post/' + props.data.id}>Read more</NavLink>
      </article>
    </div>
  );
};

export default PostItem;
