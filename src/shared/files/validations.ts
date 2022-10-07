import { Config } from '@/shared/helpers/string/validate';

export const required: Config = { required: { check: true } };

export const requiredEmail: Config = { ...required, email: { check: true } };

export const requiredSelect = (value: string) => ({
  custom: { check: value !== 'select', message: 'Value required.' },
});

export const requiredMin = (min: number): Config => ({ ...required, min: { check: min } });

export const custom = (condition: boolean, message: string) => ({
  custom: { check: condition, message },
});
