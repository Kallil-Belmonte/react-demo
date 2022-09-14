const getEnv = (env: string | boolean | undefined) => (typeof env === 'string' ? env : '');

export const MOCKY_API = getEnv(import.meta.env.VITE_MOCKY_URL);

export const JSON_PLACEHOLDER_API = getEnv(import.meta.env.VITE_JSON_PLACEHOLDER_URL);
