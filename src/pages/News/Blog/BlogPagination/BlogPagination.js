import React, { useMemo, useCallback } from 'react';

import { Pagination } from 'react-bootstrap';

const { Item } = Pagination;

const BlogPagination = ({ pages, firstItem, maxItem, currentPage, onPaginate }) => {
  const startPages = useMemo(() => {
    return firstItem - 1;
  }, [firstItem]);

  const endPages = useMemo(() => {
    return startPages + maxItem;
  }, [startPages, maxItem]);

  const isItemActive = useCallback(
    page => {
      return Number(page) === currentPage;
    },
    [currentPage],
  );

  const renderItems = () =>
    pages.slice(startPages, endPages).map(page => (
      <Item
        key={page}
        active={isItemActive(page)}
        onClick={() => (isItemActive(page) ? undefined : onPaginate(page))}
      >
        {page}
      </Item>
    ));

  return (
    <nav data-component="pagination" className="d-inline-block">
      <Pagination className="mb-0">
        {firstItem > 1 && <Item onClick={() => onPaginate('previous')}>Previous</Item>}

        {renderItems()}

        {endPages < pages.length && <Item onClick={() => onPaginate('next')}>Next</Item>}
      </Pagination>
    </nav>
  );
};

export default BlogPagination;
