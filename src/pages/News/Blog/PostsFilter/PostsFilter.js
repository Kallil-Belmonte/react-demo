import React from 'react';

import './PostsFilter.scss';

const PostsFilter = (props) => {
  return (
    <section data-component="PostsFilter">
      <form>
        <div className="form-row">
          <div className="col-md-2">
            <div className="form-group">
              <label htmlFor="filter">Posts per page:</label>
              <select id="filter" className="form-control" onChange={props.change}>
                <option value="9">9</option>
                <option value="18">18</option>
                <option value="27">27</option>
                <option value="36">36</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default PostsFilter;
