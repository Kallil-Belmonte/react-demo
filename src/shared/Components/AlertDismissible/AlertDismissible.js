import React from 'react';

import { Alert } from 'reactstrap';

const AlertDismissible  = ({ color, onDismiss, children }) => {
  return (
    <Alert color={color} isOpen={true} toggle={() => onDismiss()}>
      {children}
    </Alert>
  );
}

export default AlertDismissible;
