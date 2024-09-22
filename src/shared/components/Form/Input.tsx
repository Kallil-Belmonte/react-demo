import { type FunctionComponent, useRef, useEffect } from 'react';

import { getFieldClass } from '@/shared/helpers';
import { UseField } from '@/shared/hooks';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  labelClass?: string;
  label: string;
  fieldClasses?: string;
  field: UseField<any>;
  formSubmitted: boolean;
};

const Input: FunctionComponent<Props> = ({
  labelClass = 'form-label',
  label,
  fieldClasses,
  type = 'text',
  field,
  formSubmitted,
  onChange,
  ...otherProps
}) => {
  const { value = '', ref, state, setValue } = field;
  const { errorMessages } = state;

  const changeEventRef = useRef<React.ChangeEvent<HTMLInputElement>>();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    changeEventRef.current = event;
    setValue(event.target.value);
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    if (changeEventRef.current) onChange?.(changeEventRef.current);
  }, [value]);

  return (
    <>
      <label className={labelClass} htmlFor={state.name}>
        {label}
      </label>
      <input
        id={state.name}
        className={`${getFieldClass(formSubmitted, state, fieldClasses)}`}
        type={type}
        name={state.name}
        value={value}
        ref={ref as React.MutableRefObject<HTMLInputElement>}
        onChange={handleChange}
        {...otherProps}
      />
      {ref.current?.validationMessage && (
        <p className="validation-message invalid-feedback">
          <strong>{ref.current.validationMessage}</strong>
        </p>
      )}
    </>
  );
};

export default Input;
