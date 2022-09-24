import { UseField, getFieldState } from '@/shared/hooks';

/**
 * @name setFields
 */

type Value = string | number | boolean;

type SetFieldParams = {
  fields: UseField[];
  value?: Value;
  reset?: { required: boolean };
};

const { assign } = Object;

const setFields = ({ fields, value, reset }: SetFieldParams) => {
  const { required } = reset || {};

  if (value !== undefined) fields.forEach(field => (field.value = value));

  if (reset) {
    setTimeout(() => {
      fields.forEach(field => assign(field.state, getFieldState(field.state.name, required)));
    });
  }
};

export default setFields;
