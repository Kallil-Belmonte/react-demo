import { type FunctionComponent, useRef, useEffect } from 'react';

import { getFieldClass } from '@/shared/helpers';
import { UseField } from '@/shared/hooks';

type Props = {
  labelClass?: string;
  label: string;
  fieldClasses?: string;
  className?: string;
  type?: string;
  placeholder?: string;
  field: UseField<any>;
  formSubmitted: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
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
      {errorMessages.map(errorMessage => (
        <div key={errorMessage} className="invalid-feedback">
          {errorMessage}
        </div>
      ))}
    </>
  );
};

export default Input;
