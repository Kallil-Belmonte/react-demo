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

const setFields = ({ fields, value, reset }: SetFieldParams) => {
  const { required } = reset || {};

  if (value !== undefined) fields.forEach(({ onSetValue }) => onSetValue(value));

  if (reset) {
    setTimeout(() => {
      fields.forEach(({ state, onSetState }) => onSetState(getFieldState(state.name, required)));
    });
  }
};

export default setFields;
