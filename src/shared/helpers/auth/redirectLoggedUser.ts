import { useRouter } from 'vue-router';

import { EXPIRATION_DATE_KEY } from '@/shared/files/consts';
import getAuthToken from './getAuthToken';

/**
 * @name redirectLoggedUser
 */

const redirectLoggedUser = () => {
  const router = useRouter();

  const expiredSession =
    new Date().getTime() > Date.parse(localStorage.getItem(EXPIRATION_DATE_KEY) || '');

  if (getAuthToken() && !expiredSession) {
    router.push('/');
  }
};

export default redirectLoggedUser;
