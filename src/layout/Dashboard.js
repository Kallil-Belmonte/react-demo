import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as Actions from 'core/redux/actions';
import Header from 'layout/Header/Header';
import Footer from 'layout/Footer/Footer';

const Dashboard = ({ fullName, dispatchLogOut, children }) => {
  const history = useHistory();

  const logOutUser = () => {
    dispatchLogOut();
    history.push('/login');
  };

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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
