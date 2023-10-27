import { type UseField, getFieldState } from '@/shared/hooks';

type Value = string | number | boolean;

type Config = {
  fields: UseField[];
  value?: Value;
  reset?: { required: boolean };
};

/**
 * @function setFields
 * @description Sets a value to the fields.
 * @param { Config } config - Configuration properties.
 */

const setFields = ({ fields, value, reset }: Config) => {
  const { required } = reset || {};

  if (value !== undefined) fields.forEach(({ setValue }) => setValue(value));

  if (reset) {
    setTimeout(() => {
      fields.forEach(({ state, setState }) => setState(getFieldState(state.name, required)));
    });
  }
};

export default setFields;
