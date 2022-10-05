import { FunctionComponent } from 'react';

import './Loader.scss';

type Props = {
  loading: boolean;
};

const Loader: FunctionComponent<Props> = ({ loading }) => {
  if (!loading) return null;
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
