import { AUTH_TOKEN_KEY, AUTH_EXPIRATION_DATE_KEY } from '@/shared/files/consts';

/**
 * @name clearStorageData
 */

const clearStorageData = () => {
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_EXPIRATION_DATE_KEY);
};

export default clearStorageData;
