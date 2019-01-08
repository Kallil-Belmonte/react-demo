import React from 'react';

import { Alert } from 'reactstrap';

const AlertDismissible  = (props) => {

  return(
    <Alert color={props.color} isOpen={true} toggle={() => props.dismiss()}>
      {props.children}
    </Alert>
  );
}

export default AlertDismissible;
