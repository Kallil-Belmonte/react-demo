import { ValidationConfig } from '@/shared/helpers/string/validate';

export const required: ValidationConfig = { required: { check: true } };

export const requiredEmail: ValidationConfig = { ...required, email: { check: true } };

export const requiredSelect = {
  custom: { isValid: (value: string) => value !== 'select', message: 'Required value.' },
};

export const requiredMin = (min: number): ValidationConfig => ({
  ...required,
  min: { check: min },
});
