import { NavigateFunction } from 'react-router';

import { AUTH_EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import isExpiredSession from './isExpiredSession';

/**
 * @function redirectLoggedUser
 */

const redirectLoggedUser = (navigate: NavigateFunction) => {
  if (!isExpiredSession()) {
    navigate('/');
  }
};

export default redirectLoggedUser;
