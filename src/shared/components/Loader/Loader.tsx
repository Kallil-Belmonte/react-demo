import React from 'react';

import './Loader.scss';

type Props = {
  isLoading: boolean;
};

const Loader = ({ isLoading }: Props) => {
  if (!isLoading) return null;
  return (
    <section data-component="Loader">
      <div className="atom-spinner">
        <div className="spinner-inner">
          <div className="spinner-line"></div>
          <div className="spinner-line"></div>
          <div className="spinner-line"></div>
          <div className="spinner-circle">&#9679;</div>
        </div>
      </div>
    </section>
  );
};

export default Loader;
