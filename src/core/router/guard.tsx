import React from 'react';

import { Redirect } from 'react-router-dom';

import { ReactType } from '@/shared/files/types';
import { AUTH_TOKEN_KEY, EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import { clearStorageData, getAuthToken } from '@/shared/helpers';

const guard = (/*pageTitle: string, */ component: any) => {
  // const isExpiredSession =
  //   new Date().getTime() > Date.parse(localStorage.getItem(EXPIRATION_DATE_KEY) || '');

  // if (getAuthToken() && !isExpiredSession) {
  return component;
  // }

  // clearStorageData();
  // return <Redirect to="/login" />;
};

export default guard;
