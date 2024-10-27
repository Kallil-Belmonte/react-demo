import getAuthToken, { type AuthToken } from './getAuthToken';

/**
 * @function isValidAuthToken
 * @description Checks if the auth token is valid.
 */

const isValidAuthToken = async () => {
  const authToken = getAuthToken() as AuthToken | null;
  if (!authToken) return false;

  const { iss, exp } = authToken;
  const isValidIssuer = iss === 'api.app-demo.com';
  const isExpired = new Date().getTime() > exp;

  return isValidIssuer && !isExpired;
};

export default isValidAuthToken;
