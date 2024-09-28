import { getAuthToken, isValidJSONString } from '@/shared/helpers';
import { MOCKY_API, JSON_PLACEHOLDER_API } from '@/core/services/_files/endpoints';
import type { RequestError } from './types';

type Config = {
  url: RequestInfo | URL;
  init?: RequestInit | undefined;
  api?: 'mocky' | 'jsonPlaceholder';
};

type Error = {
  body: RequestError;
  stack: string;
};

const { stringify, parse } = JSON;

const INIT = { method: 'GET' };
const HEADERS = { 'Content-Type': 'application/json' };

const request = async <Type>(config: Config): Promise<Type> => {
  const { url, init = INIT, api = 'mocky' } = config;

  try {
    const apis = {
      mocky: MOCKY_API,
      jsonPlaceholder: JSON_PLACEHOLDER_API,
    };
    const authToken = getAuthToken(true);
    const requestInit: RequestInit = {
      ...init,
      headers: { ...HEADERS, Authorization: `Bearer ${authToken}` },
    };

    const response = await fetch(`${apis[api]}/${url}`, requestInit);
    const jsonResponse: Type = await response.json();

    if (response.ok) return jsonResponse;
    throw new Error(stringify(jsonResponse));
  } catch (e: any) {
    const error: Error = {
      body: isValidJSONString(e.message) ? parse(e.message) : { messages: [e.message] },
      stack: e.stack,
    };
    throw error;
  }
};

export default request;
