import { FieldState } from '@/shared/hooks';

/**
 * @name getFieldClass
 */

const getFieldClass = (
  isFormSubmitted: boolean,
  state: FieldState,
  baseClasses = 'form-control',
) => {
  let classNames = `${baseClasses} `;
  if ((isFormSubmitted || state.dirty) && state.invalid) classNames += 'is-invalid';
  return classNames;
};

export default getFieldClass;
