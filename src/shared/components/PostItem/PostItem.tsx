import type { FunctionComponent } from 'react';

import type { Post } from '@/core/services/news/types';
import { limitWords } from '@/shared/helpers';
import Button from '../Button/Button';
import './PostItem.scss';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  post: Post;
};

const PostItem: FunctionComponent<Props> = ({ post, ...otherProps }) => {
  return (
    <div data-component="PostItem" {...otherProps}>
      {post.image ? (
        <img className="img-fluid" src={post.image} alt="Cover" />
      ) : (
        <div className="img-placeholder">No image for this post</div>
      )}
      <article>
        <h3 className="title">{post.title}</h3>
        <p className="mb-0">{post.body ? limitWords(post.body, 8) : null}</p>
        <Button className="mt-3" route={`/post/${post.id}`}>
          Read more
        </Button>
      </article>
    </div>
  );
};

export default PostItem;
