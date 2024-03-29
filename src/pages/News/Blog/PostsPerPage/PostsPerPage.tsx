import type { FunctionComponent } from 'react';

import type { PostsPerPageProps } from '@/pages/News/Blog/_files/types';
import './PostsPerPage.scss';

const PostsPerPage: FunctionComponent<PostsPerPageProps> = ({ postsPerPage, onChange }) => {
  return (
    <section data-component="posts-per-page">
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <label htmlFor="filter" className="form-label">
              Posts per page:
            </label>
            <select
              id="filter"
              className="form-select"
              aria-label="Filter"
              value={postsPerPage}
              onChange={onChange}
            >
              <option value={9}>9</option>
              <option value={18}>18</option>
              <option value={27}>27</option>
              <option value={36}>36</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostsPerPage;
