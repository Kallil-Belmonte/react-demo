import { History } from 'node_modules/@types/history/index.d';

import { EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import getAuthToken from './getAuthToken';

/**
 * @name redirectLoggedUser
 */

const redirectLoggedUser = (history: History<any>) => {
  const expiredSession =
    new Date().getTime() > Date.parse(localStorage.getItem(EXPIRATION_DATE_KEY) || '');

  if (getAuthToken() && !expiredSession) {
    history.push('/');
  }
};

export default redirectLoggedUser;
