/**
 * @name getFieldClass
 */

const getFieldClass = (fieldError: any) => `${fieldError ? 'is-invalid' : ''}`;

export default getFieldClass;
