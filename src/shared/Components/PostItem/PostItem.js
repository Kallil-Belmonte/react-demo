import React from 'react';
import { NavLink } from 'react-router-dom';

import * as Helpers from 'shared/Helpers';
import './PostItem.scss';

const PostItem = ({ data }) => {
  const postImage = data.image
    ? <img className="img-fluid" src={data.image} alt="Capa" />
    : <div className="img-placeholder">Não há imagem para esse post</div>;

  return (
    <div data-component="PostItem">
      {postImage}
      <article>
        <h3 className="title">{data.title}</h3>
        <p className="mb-0">{data.body ? Helpers.limitWords(data.body, 8) + '...' : null}</p>
        <NavLink className="btn btn-primary mt-3" to={'/post/' + data.id}>Read more</NavLink>
      </article>
    </div>
  );
};

export default React.memo(PostItem);
