import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './PageHeader.css';

const PageHeader = (props) => {
  return (
    <section data-component="PageHeader">
      <FontAwesomeIcon className="icon d-block mx-auto" icon={props.icon} />
      <h1 className="title">{props.title}</h1>
    </section>
  );
};

export default PageHeader;
