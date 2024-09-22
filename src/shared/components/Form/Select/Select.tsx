import { type FunctionComponent, useRef, useEffect } from 'react';

import { getFieldClass } from '@/shared/helpers';
import { UseField } from '@/shared/hooks';

type Props = React.InputHTMLAttributes<HTMLSelectElement> & {
  labelClass?: string;
  label: string;
  field: UseField<any>;
  formSubmitted: boolean;
  children: React.ReactNode;
};

const Input: FunctionComponent<Props> = ({
  labelClass = 'form-label',
  label,
  className = '',
  field,
  formSubmitted,
  onChange,
  children,
  ...otherProps
}) => {
  const { value = '', ref, state, setValue } = field;
  const { errorMessages } = state;

  const changeEventRef = useRef<React.ChangeEvent<HTMLSelectElement>>();

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = event => {
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
      <select
        id={state.name}
        className={`${getFieldClass(formSubmitted, state, 'form-select')} ${className}`}
        name={state.name}
        value={value}
        ref={ref as React.MutableRefObject<HTMLSelectElement>}
        onChange={handleChange}
        {...otherProps}
      >
        {children}
      </select>
      {errorMessages.map(errorMessage => (
        <div key={errorMessage} className="invalid-feedback">
          {errorMessage}
        </div>
      ))}
    </>
  );
};

export default Input;
