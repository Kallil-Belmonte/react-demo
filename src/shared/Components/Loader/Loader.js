import React from 'react';

import './Loader.css';

const Loader = (props) => {
  return (
    props.loading ?
      <section className="loader">
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
