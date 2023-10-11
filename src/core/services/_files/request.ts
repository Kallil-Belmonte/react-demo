import { getAuthToken } from '@/shared/helpers';
import { MOCKY_API, JSON_PLACEHOLDER_API } from '@/core/services/_files/endpoints';

type API = 'mocky' | 'jsonPlaceholder';

const request = async <Type>(
  url: RequestInfo | URL,
  init: RequestInit | undefined = { method: 'GET' },
  api: API = 'mocky',
): Promise<Type> => {
  try {
    const apis = {
      mocky: MOCKY_API,
      jsonPlaceholder: JSON_PLACEHOLDER_API,
    };
    const authToken = getAuthToken();
    const requestInit = { ...init, Authorization: `Bearer ${authToken}` };

    const response = await fetch(`${apis[api]}/${url}`, requestInit);
    return await response.json();
  } catch (error: any) {
    throw error;
  }
};

export default request;
