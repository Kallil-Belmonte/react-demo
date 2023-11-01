import {
  type Dispatch,
  type SetStateAction,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';

import { ValidationConfig, Validations, validate } from '@/shared/helpers';
import useCustomState from '@/shared/hooks/state/useCustomState';

// untouched: True if the user has not focused on the element.
// touched: True if the user has focused on the element.
// pristine: True if the element’s value have not been changed.
// dirty: True if the element’s value have been changed.
// valid: True if the element’s value is valid and false otherwise.
// invalid: True if the element’s value is invalid and false otherwise.

export type FieldState = Validations & {
  name: string;
  untouched: boolean;
  touched: boolean;
  pristine: boolean;
  dirty: boolean;
  valid: boolean;
  invalid: boolean;
  errorMessages: string[];
};

type UseFieldConfig<Value> = {
  name: FieldState['name'];
  defaultValue?: Value;
  validation?: ValidationConfig;
};

export type UseField<Value = any> = {
  value: Value;
  ref: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  state: FieldState;
  setValue: Dispatch<SetStateAction<Value>>;
  setState: (modifiedProps: Partial<FieldState>) => void;
};

const { keys } = Object;

export const getFieldState = (name: FieldState['name'], required = false): FieldState => ({
  name,
  untouched: true,
  touched: false,
  pristine: true,
  dirty: false,
  valid: !required,
  invalid: required,
  errorMessages: [],
});

const useField = <Value = string>(config: UseFieldConfig<Value>): UseField<Value> => {
  const { name, defaultValue, validation = {} } = config;

  const [value, setValue] = useState(defaultValue as Value);
  const fieldRef = useRef<any>();

  const [state, setState] = useCustomState(getFieldState(name, validation.required?.check));
  const { touched, pristine, dirty } = state;

  const controlUpdate = useCallback(
    (updatedValue: Value | undefined) => {
      if (updatedValue === undefined) return;

      const updatedState: Partial<FieldState> = {};
      if (pristine) updatedState.pristine = false;
      if (!dirty) updatedState.dirty = true;

      const getConvertedValue = () => {
        if (updatedValue === null) return '';
        return typeof updatedValue === 'string' || typeof updatedValue === 'number'
          ? String(updatedValue)
          : null;
      };

      const convertedValue = getConvertedValue();

      if (typeof convertedValue === 'string' && keys(validation).length) {
        const { isValid, errorMessages, ...otherValidationProps } = validate(
          convertedValue,
          validation,
        );

        keys(otherValidationProps).forEach((validationKey: string) => {
          const key = validationKey as keyof Validations;
          updatedState[key] = otherValidationProps[key];
        });

        updatedState.valid = isValid;
        updatedState.invalid = !isValid;
        updatedState.errorMessages = errorMessages;
      }

      setState(updatedState);
    },
    [pristine, dirty, keys(validation).length, setState],
  );

  const controlTouching = useCallback(() => {
    if (!fieldRef.current || touched) return;

    const setUntouched = () => {
      setState({ untouched: false });
      fieldRef.current?.removeEventListener('focus', setUntouched);
    };
    fieldRef.current.addEventListener('focus', setUntouched);

    const setTouched = () => {
      setState({ touched: true });
      fieldRef.current?.removeEventListener('focusout', setTouched);
    };
    fieldRef.current.addEventListener('focusout', setTouched);
  }, [touched, setState]);

  // LIFECYCLE HOOKS
  useEffect(() => {
    controlUpdate(value);
  }, [value]);

  useEffect(() => {
    controlTouching();
  }, [touched]);

  return { value, ref: fieldRef, state, setValue, setState };
};

export default useField;
