import React from 'react';
import { Redirect } from 'react-router-dom';

const RouteGuard = (component) => {
  let authToken = sessionStorage.getItem('authTokenReactDemo') || localStorage.getItem('authTokenReactDemo');
  let expiredSession = new Date().getTime() > Date.parse(localStorage.getItem('expirationDateReactDemo'));

  if (authToken && !expiredSession) {
    return component;
  } else {
    // Remove token
    sessionStorage.removeItem('authTokenReactDemo');
    localStorage.removeItem('authTokenReactDemo');
    localStorage.removeItem('expirationDateReactDemo');

    // Redirect
    return <Redirect to="/login" />;
  }
};

export default RouteGuard;
