import React from 'react';

import { PostsPerPageProps } from '@/pages/News/Blog/_files/types';
import './PostsPerPage.scss';

const PostsPerPage = ({ postsPerPage, onChange }: PostsPerPageProps) => {
  return (
    <section data-component="PostsPerPage">
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
