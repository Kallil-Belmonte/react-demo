import React, { Fragment } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logOut } from 'core/redux/reducers/auth';
import Header from 'layout/Header/Header';
import Footer from 'layout/Footer/Footer';

const Dashboard = ({ children }) => {
  const { userData } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const logOutUser = () => {
    dispatch(logOut());
    history.push('/login');
  };

  return (
    <Fragment>
      <Header userFullName={`${userData.firstName} ${userData.lastName}`} onLogOut={logOutUser} />
      {children}
      <Footer />
    </Fragment>
  );
};

export default Dashboard;
