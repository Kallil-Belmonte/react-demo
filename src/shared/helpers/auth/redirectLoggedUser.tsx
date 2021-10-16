import React from 'react';

import { useHistory } from 'react-router-dom';

import { EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import getAuthToken from './getAuthToken';

/**
 * @name redirectLoggedUser
 */

const redirectLoggedUser = () => {
  const history = useHistory();

  const expiredSession =
    new Date().getTime() > Date.parse(localStorage.getItem(EXPIRATION_DATE_KEY) || '');

  if (getAuthToken() && !expiredSession) {
    history.push('/');
  }

  return null;
};

export default redirectLoggedUser;
