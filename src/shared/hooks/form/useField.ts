import { Dispatch, SetStateAction, MutableRefObject, useState, useRef, useEffect } from 'react';

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

type UseFieldConfig<Type> = {
  name: string;
  defaultValue?: Type;
  validation?: ValidationConfig;
};

export type UseField<Type = any> = {
  value: Type;
  ref: MutableRefObject<HTMLElement>;
  state: FieldState;
  onSetValue: Dispatch<SetStateAction<Type>>;
  onSetState: (modifiedProps: Partial<FieldState>) => void;
};

const { keys } = Object;

export const getFieldState = (name: string, required: boolean = false): FieldState => ({
  name,
  untouched: true,
  touched: false,
  pristine: true,
  dirty: false,
  valid: !required,
  invalid: required,
  errorMessages: [],
});

const useField = <Type = string>(config: UseFieldConfig<Type>): UseField<Type> => {
  const { name, defaultValue, validation = {} } = config;

  const [value, setValue] = useState(defaultValue as Type);
  const fieldRef = useRef() as MutableRefObject<HTMLElement>;

  const [state, setState] = useCustomState(getFieldState(name, validation.required?.check));
  const { touched, pristine, dirty } = state;

  const controlUpdate = (value: Type) => {
    if (pristine) setState({ pristine: false });
    if (!dirty) setState({ dirty: true });

    if (keys(validation).length) {
      const { isValid, errorMessages, ...otherValidationProps } = validate(
        value as string,
        validation,
      );

      setState({
        valid: isValid,
        invalid: !isValid,
        errorMessages: errorMessages,
      });
      keys(otherValidationProps).forEach((validationKey: string) => {
        const key = validationKey as keyof Validations;
        setState({ [key]: otherValidationProps[key] });
      });
    }
  };

  const controlTouching = () => {
    if (!fieldRef.current || touched) return;

    const setUntouched = () => {
      setState({ untouched: false });
      fieldRef.current.removeEventListener('focus', setUntouched);
    };
    fieldRef.current.addEventListener('focus', setUntouched);

    const setTouched = () => {
      setState({ touched: true });
      fieldRef.current.removeEventListener('focusout', setTouched);
    };
    fieldRef.current.addEventListener('focusout', setTouched);
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    controlUpdate(value);
  }, [value]);

  useEffect(() => {
    controlTouching();
  }, [touched]);

  useEffect(() => {
    controlTouching();
  }, []);

  return { value, ref: fieldRef, state, onSetValue: setValue, onSetState: setState };
};

export default useField;
