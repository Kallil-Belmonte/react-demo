import type { FunctionComponent } from 'react';

import { getFieldClass } from '@/shared/helpers';
import { UseField } from '@/shared/hooks';

type Props = {
  labelClass?: string;
  label: string;
  className?: string;
  field: UseField<any>;
  formSubmitted: boolean;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
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
  const { value = '', ref, state, onSetValue } = field;
  const { errorMessages } = state;

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = event => {
    onSetValue(event.target.value);
    onChange?.(event);
  };

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
        ref={ref as React.LegacyRef<HTMLSelectElement>}
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
