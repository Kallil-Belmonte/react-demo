import { AUTH_EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import getAuthToken from './getAuthToken';

/**
 * @function isExpiredSession
 */

const isExpiredSession = () => {
  if (!getAuthToken()) return true;
  return new Date().getTime() > Date.parse(localStorage.getItem(AUTH_EXPIRATION_DATE_KEY) || '');
};

export default isExpiredSession;
