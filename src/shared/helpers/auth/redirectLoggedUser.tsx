import React from 'react';

import { useNavigate } from 'react-router-dom';

import { EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import getAuthToken from './getAuthToken';

/**
 * @name redirectLoggedUser
 */

const redirectLoggedUser = () => {
  const navigate = useNavigate();

  const expiredSession =
    new Date().getTime() > Date.parse(localStorage.getItem(EXPIRATION_DATE_KEY) || '');

  if (getAuthToken() && !expiredSession) {
    navigate('/');
  }

  return null;
};

export default redirectLoggedUser;
