import React from 'react';

import { Redirect } from 'react-router-dom';
import { clearStorageData } from 'core/redux/rootReducer';

const RouterGuard = component => {
  const authToken =
    sessionStorage.getItem('authTokenReactDemo') || localStorage.getItem('authTokenReactDemo');
  const expiredSession =
    new Date().getTime() > Date.parse(localStorage.getItem('expirationDateReactDemo'));

  if (authToken && !expiredSession) {
    return component;
  }

  clearStorageData();

  return <Redirect to="/login" />;
};

export default RouterGuard;
