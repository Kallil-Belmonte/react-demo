import { Rules } from 'node_modules/async-validator/dist-types/index.d';

import { emailRegex } from '@/shared/files/regex';

/**
 * @name validators
 */

export const emailValidator = (rule: Rules, value: any) => {
  if (!emailRegex.test(value)) return new Error('E-mail is not valid');
  return true;
};

export const selectValidator = (rule: Rules, value: any) => {
  if (value === 'select') return new Error(`${rule.field} is required`);
  return true;
};
