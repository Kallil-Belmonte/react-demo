import React from 'react';

import { Redirect } from 'react-router-dom';

import { AUTH_TOKEN_KEY, EXPIRATION_DATE_KEY } from 'shared/files/consts';
import { setPageTitle, clearStorageData } from 'shared/helpers';

const RouterGuard = (pageTitle, component) => {
  const authToken = sessionStorage.getItem(AUTH_TOKEN_KEY) || localStorage.getItem(AUTH_TOKEN_KEY);
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
