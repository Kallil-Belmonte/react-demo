import type { FunctionComponent } from 'react';

import './Pagination.scss';

type Props = {
  pages: string[];
  firstItem: number;
  maxItem: number;
  currentPage: number;
  onPaginate: (target: string) => void;
};

const Pagination: FunctionComponent<Props> = ({
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
    <nav data-component="Pagination" aria-label="Pagination" className="mx-auto">
      <ul className="d-flex">
        {firstItem > 1 && (
          <li>
            <button type="button" onClick={() => onPaginate('previous')}>
              Previous
            </button>
          </li>
        )}

        {pages.slice(startPages, endPages).map(page => (
          <li key={page} onClick={() => (isItemActive(page) ? undefined : onPaginate(page))}>
            <button className={isItemActive(page) ? 'active' : ''} type="button">
              {page}
            </button>
          </li>
        ))}

        {endPages < pages.length && (
          <li>
            <button type="button" onClick={() => onPaginate('next')}>
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
