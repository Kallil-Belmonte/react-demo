import { type UseField, getFieldState } from '@/shared/hooks';

/**
 * @function setFields
 */

type Value = string | number | boolean;

type Config = {
  fields: UseField[];
  value?: Value;
  reset?: { required: boolean };
};

const setFields = ({ fields, value, reset }: Config) => {
  const { required } = reset || {};

  if (value !== undefined) fields.forEach(({ onSetValue }) => onSetValue(value));

  if (reset) {
    setTimeout(() => {
      fields.forEach(({ state, onSetState }) => onSetState(getFieldState(state.name, required)));
    });
  }
};

export default setFields;
