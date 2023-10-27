import { Validations, ValidationConfig, validate } from '@/shared/helpers';
import { type FieldState, UseField } from '@/shared/hooks';

type Config = {
  fields: UseField[];
  validation?: ValidationConfig;
  updateState?: boolean;
};

const { keys } = Object;

/**
 * @function validateForm
 */

export const validateFields = ({ fields, validation = {}, updateState = true }: Config) => {
  let isValidFields = fields.every(field => field.state.valid);

  if (keys(validation).length) {
    isValidFields = fields
      .map(field => {
        const { value, setState } = field;
        const { isValid, errorMessages, ...otherValidationProps } = validate(value, validation);

        if (updateState) {
          const updatedState: Partial<FieldState> = {
            valid: isValid,
            invalid: !isValid,
            errorMessages,
          };

          keys(otherValidationProps).forEach((validationKey: string) => {
            const key = validationKey as keyof Validations;
            updatedState[key] = otherValidationProps[key];
          });

          setState(updatedState);
        }

        return isValid;
      })
      .every(isValid => isValid);
  }

  return isValidFields;
};

const validateForm = (formItems: Config[]) => {
  const isValidFields = formItems.map(item => validateFields(item));
  return isValidFields.every(isValid => isValid);
};

export default validateForm;
