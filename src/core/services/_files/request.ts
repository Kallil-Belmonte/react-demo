import { getAuthToken } from '@/shared/helpers';
import { MOCKY_API, JSON_PLACEHOLDER_API } from '@/core/services/_files/endpoints';

type API = 'mocky' | 'jsonPlaceholder';

const { stringify } = JSON;

const HEADERS = { 'Content-Type': 'application/json' };

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
    const requestInit = {
      ...init,
      headers: { ...HEADERS, Authorization: `Bearer ${authToken}` },
    };
    const response = await fetch(`${apis[api]}/${url}`, requestInit);
    const jsonResponse: Type = await response.json();
    if (response.ok) return jsonResponse;
    throw new Error(stringify(jsonResponse));
  } catch (error: any) {
    throw error;
  }
};

export default request;
