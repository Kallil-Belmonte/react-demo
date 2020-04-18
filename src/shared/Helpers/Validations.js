const minLength = (min) => (value) => value && value.length < min ? `Must be ${min} characters or more` : undefined;
const maxLength = (max) => (value) => value && value.length > max ? `Must be ${max} characters or less` : undefined;

class Validations {
  static required = (value) => value || typeof value === 'number' ? undefined : 'Required';

  static minLength3 = minLength(3);

  static minLength5 = minLength(5);

  static maxLength15 = maxLength(15);

  static email = (value) => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;

  static number = (value) => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

  static alphaNumeric = (value) => value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters' : undefined;
}

export default Validations;
