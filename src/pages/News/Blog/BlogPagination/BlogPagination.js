import React, { Fragment } from 'react';

import { Pagination } from 'react-bootstrap';

const BlogPagination = ({ firstPage, totalPages, onPaginate }) => {
  const firstItem  = firstPage;
  const secondItem = firstPage + 1;
  const thirdItem  = firstPage + 2;
  const fourthItem = firstPage + 3;
  const fifthItem  = firstPage + 4;

  return (
    <nav data-component="pagination" className="d-inline-block" aria-label="Pagination" onClick={(event) => onPaginate(event)}>
      <Pagination className="mb-0">
        {firstItem > 1 && <Pagination.Item>Previous</Pagination.Item>}

        <Pagination.Item active>{firstItem}</Pagination.Item>

        {secondItem <= totalPages && <Pagination.Item>{secondItem}</Pagination.Item>}

        {thirdItem <= totalPages && <Pagination.Item>{thirdItem}</Pagination.Item>}

        {fourthItem <= totalPages && <Pagination.Item>{fourthItem}</Pagination.Item>}

        {fifthItem <= totalPages && (
          <Fragment>
            <Pagination.Item>{fifthItem}</Pagination.Item>
            <Pagination.Item>Next</Pagination.Item>
          </Fragment>
        )}
      </Pagination>
    </nav>
  );
};

export default BlogPagination;
