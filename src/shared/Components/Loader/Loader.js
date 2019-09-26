import React from 'react';

import './Loader.scss';

const Loader = ({ loading }) => {
  return (
    loading ?
      <section data-component="Loader">
        <div className="atom-spinner">
          <div className="spinner-inner">
            <div className="spinner-line"></div>
            <div className="spinner-line"></div>
            <div className="spinner-line"></div>
            <div className="spinner-circle">
              &#9679;
            </div>
          </div>
        </div>
      </section>
    : null
  );
};

export default Loader;
