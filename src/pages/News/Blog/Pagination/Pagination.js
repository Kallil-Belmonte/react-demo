import React from 'react';

const Pagination = (props) => {
  const firstItem  = props.firstItem;
  const secondItem = props.firstItem + 1;
  const thirdItem  = props.firstItem + 2;
  const fourthItem = props.firstItem + 3;
  const fifthItem  = props.firstItem + 4;

  return (
    <nav data-component="pagination" className="d-inline-block" aria-label="Pagination" onClick={props.paginate}>
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
