import React from 'react';
import { Redirect } from 'react-router-dom';

const RouterGuard = (component) => {
  const authToken = sessionStorage.getItem('authTokenReactDemo') || localStorage.getItem('authTokenReactDemo');
  const expiredSession = new Date().getTime() > Date.parse(localStorage.getItem('expirationDateReactDemo'));

  if (authToken && !expiredSession) {
    return component;
  }

  // Remove token
  sessionStorage.removeItem('authTokenReactDemo');
  localStorage.removeItem('authTokenReactDemo');
  localStorage.removeItem('expirationDateReactDemo');

  // Redirect
  return <Redirect to="/login" />;
};

export default RouterGuard;
