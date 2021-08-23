import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logOut } from 'core/redux/reducers/auth';
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
const mapStateToProps = ({ user: { userData } }) => ({
  fullName: `${userData.firstName} ${userData.lastName}`,
});

// MAP DISPATCH TO PROPS
const mapDispatchToProps = dispatch => ({
  dispatchLogOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
