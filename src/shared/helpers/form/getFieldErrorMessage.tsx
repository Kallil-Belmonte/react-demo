import { FieldError } from 'node_modules/react-hook-form/dist/types/errors.d';

/**
 * @name getFieldErrorMessage
 */

const getFieldErrorMessage = (fieldError?: FieldError) =>
  fieldError?.message && <div className="invalid-feedback">{fieldError.message}</div>;

export default getFieldErrorMessage;
