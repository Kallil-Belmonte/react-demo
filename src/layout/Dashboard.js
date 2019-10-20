import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from 'core/Redux/Actions/ActionCreators';
import * as Helpers from 'shared/Helpers';
import Header from 'layout/Header/Header';
import Footer from 'layout/Footer/Footer';

class Dashboard extends Component {
  componentDidMount() {
    this.setPageTitle();
  }

  render() {
    const { fullName, children } = this.props;

    return (
      <Fragment>
        <Header userFullName={fullName} onLogOut={() => this.logOutUser()} />
          {children}
        <Footer />
      </Fragment>
    );
  }


  //==============================
  // GENERAL METHODS
  //==============================

  // SET PAGE TITLE
  setPageTitle() {
    const { pathname } = this.props.location;

    if (pathname === '/') {
      // Set home page title
      Helpers.setPageTitle('Home');
    } else {
      const pageUrl = pathname.split('-').join(' ');
      const urlName = Helpers.capitalizeFirstLetter(pageUrl.split('/')[1]);

      // Set dynamic page title
      Helpers.setPageTitle(urlName);
    }
  }


  // LOG OUT USER
  logOutUser() {
    const { handleLogOut, history } = this.props;

    // Remove token
    sessionStorage.removeItem('authTokenReactDemo');
    localStorage.removeItem('authTokenReactDemo');
    localStorage.removeItem('expirationDateReactDemo');

    // Handle log out
    handleLogOut();

    // Redirect
    history.push('/login');
  }
};


//==============================
// REDUX
//==============================

// MAP STATE TO PROPS
const mapStateToProps = (state) => ({
  fullName: `${state.userData.firstName} ${state.userData.lastName}`
});

// MAP DISPATCH TO PROPS
const mapDispatchToProps = (dispatch) => ({
  handleLogOut: () => dispatch(actionCreators.logOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));
