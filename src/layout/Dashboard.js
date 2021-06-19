import React, { Fragment, useEffect } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as Actions from 'core/redux/actions';
import { setPageTitle, capitalizeFirstLetter } from 'shared/helpers';
import Header from 'layout/Header/Header';
import Footer from 'layout/Footer/Footer';

const Dashboard = ({ fullName, location, history, dispatchLogOut, children }) => {
  // HANDLE SET PAGE TITLE
  const handleSetPageTitle = () => {
    const { pathname } = location;

    if (pathname === '/') {
      setPageTitle('Home');
    } else {
      const pageUrl = pathname.split('-').join(' ');
      const urlName = capitalizeFirstLetter(pageUrl.split('/')[1]);
      setPageTitle(urlName);
    }
  };

  // LOG OUT USER
  const logOutUser = () => {
    dispatchLogOut();
    history.push('/login');
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    handleSetPageTitle();
  }, []); // eslint-disable-line

  return (
    <Fragment>
      <Header userFullName={fullName} onLogOut={logOutUser} />
      {children}
      <Footer />
    </Fragment>
  );
};

//==============================
// REDUX
//==============================

// MAP STATE TO PROPS
const mapStateToProps = ({ userData }) => ({
  fullName: `${userData.firstName} ${userData.lastName}`,
});

// MAP DISPATCH TO PROPS
const mapDispatchToProps = dispatch => ({
  dispatchLogOut: () => dispatch(Actions.logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));
