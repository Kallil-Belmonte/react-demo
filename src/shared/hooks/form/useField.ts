import { type Dispatch, type SetStateAction, useRef, useState } from 'react';

type UseFieldConfig<Value> = {
  defaultValue?: Value;
};

export type UseField<Value = any> = {
  ref: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  value: Value;
  setValue: Dispatch<SetStateAction<Value>>;
};

const useField = <Value = string>(config?: UseFieldConfig<Value>): UseField<Value> => {
  const { defaultValue } = config || {};

  const fieldRef = useRef<any>();
  const [value, setValue] = useState(defaultValue as Value);

  return { ref: fieldRef, value, setValue };
};

export default useField;
