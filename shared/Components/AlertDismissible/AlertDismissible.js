import React from 'react';

import { Alert } from 'reactstrap';

class AlertDismissible  extends React.Component {
  state = {
    visible: true
  }

  render() {
    return (
      <Alert color={this.props.color} isOpen={this.state.visible} toggle={() => this.handleDismiss()}>
        {this.props.children}
      </Alert>
    );
  }


  //==============================
  // GENERAL METHODS
  //==============================

  // HANDLE DISMISS
  handleDismiss() {
    this.setState((prevState, props) => {
      return { visible: false };
    });
  }
}

export default AlertDismissible;
