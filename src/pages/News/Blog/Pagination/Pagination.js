import React from 'react';

import './Pagination.css';

const Pagination = (props) => {
  let firstItem  = props.firstItem;
  let secondItem = props.firstItem + 1;
  let thirdItem  = props.firstItem + 2;
  let fourthItem = props.firstItem + 3;
  let fifthItem  = props.firstItem + 4;

  return (
    <nav id="pagination" aria-label="pagination" onClick={props.paginate}>
      <ul className="pagination mb-0">
        {firstItem > 1 ?
          <li className="page-item">
            <button className="page-link" type="button">Previous</button>
          </li>
        : null}

        <li className="page-item active">
          <button className="page-link" type="button">{firstItem}</button>
        </li>

        {secondItem <= props.totalItems ?
          <li className="page-item">
            <button className="page-link" type="button">{secondItem}</button> {/* <span className="sr-only">(atual)</span> */}
          </li>
        : null}

        {thirdItem <= props.totalItems ?
          <li className="page-item">
            <button className="page-link" type="button">{thirdItem}</button>
          </li>
        : null}

        {fourthItem <= props.totalItems ?
          <li className="page-item">
            <button className="page-link" type="button">{fourthItem}</button>
          </li>
        : null}

        {fifthItem <= props.totalItems ?
          <React.Fragment>
            <li className="page-item">
              <button className="page-link" type="button">{fifthItem}</button>
            </li>

            <li className="page-item">
              <button className="page-link" type="button">Next</button>
            </li>
          </React.Fragment>
        : null}
      </ul>
    </nav>
  );
};

export default Pagination;
