import React from 'react';
import { Redirect } from 'react-router-dom';

const RouteGuard = (component) => {
  let authToken = sessionStorage.getItem('authTokenProjectName') || localStorage.getItem('authTokenProjectName');
  let expiredSession = new Date().getTime() > Date.parse(localStorage.getItem('expirationDate'));

  if (authToken && !expiredSession) {
    return component;
  } else {
    // Remove token
    sessionStorage.removeItem('authTokenProjectName');
    localStorage.removeItem('authTokenProjectName');
    localStorage.removeItem('expirationDate');

    // Redirect
    return <Redirect to="/login" />;
  }
};

export default RouteGuard;
