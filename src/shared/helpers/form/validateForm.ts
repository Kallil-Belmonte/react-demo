import { Validations, ValidationConfig, validate } from '@/shared/helpers';
import { UseField } from '@/shared/hooks';

/**
 * @function validateForm
 */

type Config = {
  fields: UseField[];
  validation?: ValidationConfig;
  updateState?: boolean;
};

const { keys } = Object;

export const validateFields = ({ fields, validation = {}, updateState = true }: Config) => {
  let isValidFields = fields.every(field => field.state.valid);

  if (keys(validation).length) {
    isValidFields = fields
      .map(field => {
        const { value, onSetState } = field;
        const { isValid, errorMessages, ...otherValidationProps } = validate(value, validation);

        if (updateState) {
          onSetState({ valid: isValid, invalid: !isValid, errorMessages });

          keys(otherValidationProps).forEach((validationKey: string) => {
            const key = validationKey as keyof Validations;
            onSetState({ [key]: otherValidationProps[key] });
          });
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
