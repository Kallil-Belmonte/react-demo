import { AUTH_TOKEN_KEY } from '@/shared/files/consts';

/**
 * @name getAuthToken
 */

const getAuthToken = () =>
  sessionStorage.getItem(AUTH_TOKEN_KEY) || localStorage.getItem(AUTH_TOKEN_KEY);

export default getAuthToken;
