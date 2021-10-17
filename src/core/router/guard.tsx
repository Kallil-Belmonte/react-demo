import React from 'react';

import { Redirect } from 'react-router-dom';

import { ReactType } from '@/shared/files/types';
import { EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import { clearStorageData, getAuthToken } from '@/shared/helpers';
import AppDashboard from '@/core/layout/AppDashboard/AppDashboard';

const guard = (component: ReactType) => {
  const isExpiredSession =
    new Date().getTime() > Date.parse(localStorage.getItem(EXPIRATION_DATE_KEY) || '');

  if (getAuthToken() && !isExpiredSession) {
    return <AppDashboard>{component}</AppDashboard>;
  }

  clearStorageData();
  return <Redirect to="/login" />;
};

export default guard;
