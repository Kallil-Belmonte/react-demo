import React from 'react';

import { NavLink } from 'react-router-dom';

import { limitWords } from 'shared/helpers';
import './PostItem.scss';

const PostItem = ({ post }) => {
  const postImage = post.image ? (
    <img className="img-fluid" src={post.image} alt="Capa" />
  ) : (
    <div className="img-placeholder">Não há imagem para esse post</div>
  );

  return (
    <div data-component="PostItem">
      {postImage}
      <article>
        <h3 className="title">{post.title}</h3>
        <p className="mb-0">{post.body ? limitWords(post.body, 8) : null}</p>
        <NavLink className="btn btn-primary mt-3" to={`/post/${post.id}`}>
          Read more
        </NavLink>
      </article>
    </div>
  );
};

export default React.memo(PostItem);
