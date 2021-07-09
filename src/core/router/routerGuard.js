import React from 'react';

import { Redirect } from 'react-router-dom';
import { clearStorageData } from 'core/redux/rootReducer';

import { ACCESS_TOKEN_KEY, EXPIRATION_DATE_KEY } from 'shared/files/consts';
import { setPageTitle } from 'shared/helpers';

const RouterGuard = (pageTitle, component) => {
  const authToken =
    sessionStorage.getItem(ACCESS_TOKEN_KEY) || localStorage.getItem(ACCESS_TOKEN_KEY);
  const expiredSession =
    new Date().getTime() > Date.parse(localStorage.getItem(EXPIRATION_DATE_KEY));

  if (authToken && !expiredSession) {
    setPageTitle(pageTitle);
    return component;
  }

  clearStorageData();

  return <Redirect to="/login" />;
};

export default RouterGuard;
