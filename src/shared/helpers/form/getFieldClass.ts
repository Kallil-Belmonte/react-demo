import type { FieldState } from '@/shared/hooks';

/**
 * @function getFieldClass
 */

const getFieldClass = (formSubmitted: boolean, state: FieldState, baseClasses = 'form-control') => {
  let classNames = `${baseClasses} `;
  if ((formSubmitted || state.dirty) && state.invalid) classNames += 'is-invalid';
  return classNames;
};

export default getFieldClass;
