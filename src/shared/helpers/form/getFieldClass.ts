import { VueHooksFormField } from '@/shared/files/types';

/**
 * @name getFieldClass
 */

const getFieldClass = (field: VueHooksFormField) => [
  'form-control',
  field.error ? 'is-invalid' : '',
];

export default getFieldClass;
