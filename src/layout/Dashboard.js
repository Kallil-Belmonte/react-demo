import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from 'core/Redux/Actions/ActionCreators';
import * as Helpers from 'shared/Helpers';
import Header from 'layout/Header/Header';
import Footer from 'layout/Footer/Footer';

const Dashboard = ({ fullName, location, history, handleLogOut, children }) => {
  // SET PAGE TITLE
  const setPageTitle = () => {
    const { pathname } = location;

    if (pathname === '/') {
      Helpers.setPageTitle('Home');
    } else {
      const pageUrl = pathname.split('-').join(' ');
      const urlName = Helpers.capitalizeFirstLetter(pageUrl.split('/')[1]);
      Helpers.setPageTitle(urlName);
    }
  };


  // LOG OUT USER
  const logOutUser = () => {
    sessionStorage.removeItem('authTokenReactDemo');
    localStorage.removeItem('authTokenReactDemo');
    localStorage.removeItem('expirationDateReactDemo');

    handleLogOut();
    history.push('/login');
  };


  // LIFECYCLE HOOKS
  useEffect(() => {
    setPageTitle();
  }, []); // eslint-disable-line


  return (
    <Fragment>
      <Header userFullName={fullName} onLogOut={() => logOutUser()} />
        {children}
      <Footer />
    </Fragment>
  );
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
