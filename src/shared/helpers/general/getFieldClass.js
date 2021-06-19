/**
 * getFieldClass
 * @param { FieldError } fieldError
 */

const getFieldClass = fieldError => {
  return `${fieldError ? 'is-invalid' : ''}`;
};

export default getFieldClass;
