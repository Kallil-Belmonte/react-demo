/**
 * @name getFieldClass
 */

const getFieldClass = (fieldError: any) => `form-control ${fieldError ? 'is-invalid' : ''}`;

export default getFieldClass;
