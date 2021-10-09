const getEnv = (env: string | boolean | undefined) => (typeof env === 'string' ? env : '');

export const JSON_PLACEHOLDER_URL = getEnv(import.meta.env.VITE_JSON_PLACEHOLDER_URL);

export const MOCKY_URL = getEnv(import.meta.env.VITE_MOCKY_URL);
