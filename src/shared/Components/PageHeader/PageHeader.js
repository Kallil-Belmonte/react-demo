import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './PageHeader.scss';

const PageHeader = ({ icon, title }) => {
  return (
    <section data-component="PageHeader">
      {icon ? <FontAwesomeIcon className="icon d-block mx-auto" icon={icon} /> : null}
      <h1 className="title">{title}</h1>
    </section>
  );
};

export default React.memo(PageHeader);
