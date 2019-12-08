import React from 'react';

import { Pagination } from 'react-bootstrap';

const BlogPagination = ({ pages, firstItem, maxItem, currentPage, onPaginate }) => {
  const startPages = firstItem - 1;
  const endPages = startPages + maxItem;
  const isItemActive = page => Number(page) === currentPage;

  const renderItems = () => pages.slice(startPages, endPages).map((page) => (
    <Pagination.Item
      key={page}
      active={isItemActive(page)}
      onClick={() => isItemActive(page) ? undefined : onPaginate(Number(page))}
    >
      {page}
    </Pagination.Item>
  ));

  return (
    <nav data-component="pagination" className="d-inline-block">
      <Pagination className="mb-0">
        {firstItem > 1 && <Pagination.Item onClick={() => onPaginate('previous')}>Previous</Pagination.Item>}

        {renderItems()}

        {endPages < pages.length && <Pagination.Item onClick={() => onPaginate('next')}>Next</Pagination.Item>}
      </Pagination>
    </nav>
  );
};

export default BlogPagination;
