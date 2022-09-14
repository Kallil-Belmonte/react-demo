import { NavigateFunction } from 'react-router';

import { AUTH_EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import getAuthToken from './getAuthToken';

/**
 * @name redirectLoggedUser
 */

const redirectLoggedUser = (navigate: NavigateFunction) => {
  const expiredSession =
    new Date().getTime() > Date.parse(localStorage.getItem(AUTH_EXPIRATION_DATE_KEY) || '');

  if (getAuthToken() && !expiredSession) {
    navigate('/');
  }
};

export default redirectLoggedUser;
