import React from 'react';

/**
 * @name getFieldErrorMessage
 */

const getFieldErrorMessage = (fieldError: any) =>
  fieldError?.message && <div className="d-block invalid-feedback">{fieldError.message}</div>;

export default getFieldErrorMessage;
