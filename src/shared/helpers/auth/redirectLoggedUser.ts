import { NavigateFunction } from 'react-router';

import { EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import getAuthToken from './getAuthToken';

/**
 * @name redirectLoggedUser
 */

const redirectLoggedUser = (navigate: NavigateFunction) => {
  const expiredSession =
    new Date().getTime() > Date.parse(localStorage.getItem(EXPIRATION_DATE_KEY) || '');

  if (getAuthToken() && !expiredSession) {
    navigate('/');
  }
};

export default redirectLoggedUser;
