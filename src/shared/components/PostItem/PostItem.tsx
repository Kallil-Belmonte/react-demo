import { memo } from 'react';

import { NavLink } from 'react-router-dom';

import { Post } from '@/core/services/news/types';
import { limitWords } from '@/shared/helpers';
import './PostItem.scss';

type Props = {
  post: Post;
};

const PostItem = ({ post }: Props) => {
  return (
    <div data-component="PostItem">
      {post.image ? (
        <img className="img-fluid" src={post.image} alt="Capa" />
      ) : (
        <div className="img-placeholder">Não há imagem para esse post</div>
      )}
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

export default memo(PostItem);
