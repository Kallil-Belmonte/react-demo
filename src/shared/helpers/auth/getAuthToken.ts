import { jwtDecode } from 'jwt-decode';

import { AUTH_TOKEN_KEY } from '@/shared/files/consts';

export type AuthToken = {
  iss: string;
  sub: string;
  iat: number;
  exp: number;
};

/**
 * @function getAuthToken
 * @description Gets the auth token.
 */

const getAuthToken = (raw?: boolean) => {
  const authToken = sessionStorage.getItem(AUTH_TOKEN_KEY) || localStorage.getItem(AUTH_TOKEN_KEY);
  if (raw) return authToken;
  return authToken ? jwtDecode<AuthToken>(authToken) : null;
};

export default getAuthToken;
