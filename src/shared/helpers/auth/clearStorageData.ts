import { AUTH_TOKEN_KEY } from '@/shared/files/consts';

/**
 * @function clearStorageData
 */

const clearStorageData = () => {
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export default clearStorageData;
