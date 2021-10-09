/**
 * @name validateFields
 */

const validateFields = async (fields: string[], validateFunction: (path: any) => Promise<any>) => {
  const errors = await Promise.all(fields.map(field => validateFunction(field)));
  return errors.filter(error => error);
};

export default validateFields;
