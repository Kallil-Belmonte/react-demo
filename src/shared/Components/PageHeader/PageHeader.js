import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './PageHeader.scss';

const PageHeader = (props) => {
  return (
    <section data-component="PageHeader">
      {props.icon ? <FontAwesomeIcon className="icon d-block mx-auto" icon={props.icon} /> : null}
      <h1 className="title">{props.title}</h1>
    </section>
  );
};

export default React.memo(PageHeader);
