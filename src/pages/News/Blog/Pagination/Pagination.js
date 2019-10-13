import React, { Fragment } from 'react';

const Pagination = ({ firstPage, totalPages, onPaginate }) => {
  const firstItem  = firstPage;
  const secondItem = firstPage + 1;
  const thirdItem  = firstPage + 2;
  const fourthItem = firstPage + 3;
  const fifthItem  = firstPage + 4;

  return (
    <nav data-component="pagination" className="d-inline-block" aria-label="Pagination" onClick={(event) => onPaginate(event)}>
      <ul className="pagination mb-0">
        {firstItem > 1 ?
          <li className="page-item">
            <button className="page-link" type="button">Previous</button>
          </li>
        : null}

        <li className="page-item active">
          <button className="page-link" type="button">{firstItem}</button>
        </li>

        {secondItem <= totalPages ?
          <li className="page-item">
            <button className="page-link" type="button">{secondItem}</button> {/* <span className="sr-only">(atual)</span> */}
          </li>
        : null}

        {thirdItem <= totalPages ?
          <li className="page-item">
            <button className="page-link" type="button">{thirdItem}</button>
          </li>
        : null}

        {fourthItem <= totalPages ?
          <li className="page-item">
            <button className="page-link" type="button">{fourthItem}</button>
          </li>
        : null}

        {fifthItem <= totalPages ?
          <Fragment>
            <li className="page-item">
              <button className="page-link" type="button">{fifthItem}</button>
            </li>

            <li className="page-item">
              <button className="page-link" type="button">Next</button>
            </li>
          </Fragment>
        : null}
      </ul>
    </nav>
  );
};

export default Pagination;
