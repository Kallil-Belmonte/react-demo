import type { FunctionComponent } from 'react';

import type { PaginationProps } from '@/pages/News/Blog/_files/types';

const Pagination: FunctionComponent<PaginationProps> = ({
  pages,
  firstItem,
  maxItem,
  currentPage,
  onPaginate,
}) => {
  const startPages = firstItem - 1;
  const endPages = startPages + maxItem;

  const isItemActive = (page: string) => Number(page) === currentPage;

  return (
    <nav data-component="pagination" className="d-inline-block" aria-label="Pagination">
      <ul className="pagination mb-0">
        {firstItem > 1 && (
          <li className="page-item" v-if="firstItem > 1">
            <button className="page-link" type="button" onClick={() => onPaginate('previous')}>
              Previous
            </button>
          </li>
        )}

        {pages.slice(startPages, endPages).map(page => (
          <li
            v-for="page in pageItems"
            key={page}
            className={`page-item ${isItemActive(page) ? 'active' : ''}`}
            onClick={() => (isItemActive(page) ? undefined : onPaginate(page))}
          >
            <button className="page-link" type="button">
              {page}
            </button>
          </li>
        ))}

        {endPages < pages.length && (
          <li className="page-item">
            <button className="page-link" type="button" onClick={() => onPaginate('next')}>
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
