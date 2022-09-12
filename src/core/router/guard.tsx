import React from 'react';

import { Navigate } from 'react-router-dom';

import { ReactType } from '@/shared/files/types';
import { EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import { clearStorageData, getAuthToken, setPageTitle } from '@/shared/helpers';
import Dashboard from '@/core/layout/Dashboard/Dashboard';

type Props = { pageTitle: string; component: ReactType };

const Guard = ({ pageTitle, component }: Props) => {
  const isExpiredSession =
    new Date().getTime() > Date.parse(localStorage.getItem(EXPIRATION_DATE_KEY) || '');

  if (getAuthToken() && !isExpiredSession) {
    setPageTitle(pageTitle);
    return <Dashboard>{component}</Dashboard>;
  }

  clearStorageData();
  return <Navigate to="/login" />;
};

export default Guard;
