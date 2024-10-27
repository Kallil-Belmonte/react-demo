import type { FunctionComponent } from 'react';

import './Loader.scss';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
  loading: boolean;
};

const Loader: FunctionComponent<Props> = ({ loading, ...otherProps }) => {
  if (!loading) return null;
  return (
    <section data-component="Loader" {...otherProps}>
      <div className="atom-spinner">
        <div className="spinner-inner">
          <div className="spinner-line" />
          <div className="spinner-line" />
          <div className="spinner-line" />
          <div className="spinner-circle">&#9679;</div>
        </div>
      </div>
    </section>
  );
};

export default Loader;
