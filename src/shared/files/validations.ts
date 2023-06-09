import { Config } from '@/shared/helpers/string/validate';

export const required: Config = { required: { check: true } };

export const requiredEmail: Config = { ...required, email: { check: true } };

export const requiredSelect = (value: string) => ({
  custom: { isValid: value !== 'select', message: 'Required value.' },
});

export const requiredMin = (min: number): Config => ({ ...required, min: { check: min } });

export const custom = (isValid: boolean, message: string) => ({ custom: { isValid, message } });
