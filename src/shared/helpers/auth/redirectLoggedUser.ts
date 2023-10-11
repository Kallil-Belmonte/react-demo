import { NavigateFunction } from 'react-router';

import isValidAuthToken from './isValidAuthToken';

/**
 * @function redirectLoggedUser
 */

const redirectLoggedUser = async (navigate: NavigateFunction) => {
  const isLoggedUser = await isValidAuthToken();

  if (isLoggedUser) {
    navigate('/');
  }
};

export default redirectLoggedUser;
