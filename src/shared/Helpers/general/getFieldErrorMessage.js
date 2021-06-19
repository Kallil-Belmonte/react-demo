import React from 'react';

/**
 * getFieldErrorMessage
 * @param { FieldError } fieldError
 */

const getFieldErrorMessage = fieldError =>
  fieldError?.message && <div className="d-block invalid-feedback">{fieldError.message}</div>;

export default getFieldErrorMessage;
