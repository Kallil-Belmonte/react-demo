import React from 'react';

import './AppLoader.scss';

type Props = {
  isLoading: boolean;
};

const AppLoader = ({ isLoading }: Props) => {
  if (!isLoading) return null;
  return (
    <section data-component="AppLoader">
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

export default AppLoader;
