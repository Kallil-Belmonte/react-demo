import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './Layout.css';
import * as actionCreators from '../core/Redux/Actions/ActionCreators';
import Header from './Header/Header';
import Footer from './Footer/Footer';

class Layout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header userFullName={this.props.fullName} logOut={() => this.logOutUser()} />
          {this.props.children}
        <Footer />
      </React.Fragment>
    );
  }


  //==============================
  // GENERAL METHODS
  //==============================

  // LOG OUT USER
  logOutUser() {
    // Remove token
    sessionStorage.removeItem('authTokenProjectName');
    localStorage.removeItem('authTokenProjectName');
    localStorage.removeItem('expirationDate');

    // Handle log out
    this.props.handleLogOut();

    // Redirect
    this.props.history.push('/login');
  }
};


//==============================
// REDUX
//==============================

// MAP STATE TO PROPS
const mapStateToProps = (state) => {
  return {
    fullName: state.userData.firstName + ' ' + state.userData.lastName
  };
};

// MAP DISPATCH TO PROPS
const mapDispatchToProps = (dispatch) => {
  return {
    handleLogOut: () => dispatch(actionCreators.logOut())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));
