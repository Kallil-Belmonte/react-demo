import { type FunctionComponent, useRef, useEffect } from 'react';

import { getFieldClass } from '@/shared/helpers';
import { UseField } from '@/shared/hooks';

type Props = {
  labelClass?: string;
  label: string;
  className?: string;
  trueValue: string | number | boolean;
  falseValue: string | number | boolean;
  field: UseField<any>;
  formSubmitted: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const Checkbox: FunctionComponent<Props> = ({
  labelClass = 'form-check-label',
  label,
  className = '',
  trueValue,
  falseValue,
  field,
  formSubmitted,
  onChange,
  ...otherProps
}) => {
  const { value, ref, state, setValue } = field;
  const { errorMessages } = state;

  const changeEventRef = useRef<React.ChangeEvent<HTMLInputElement>>();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    changeEventRef.current = event;
    setValue(event.target.checked ? trueValue : falseValue);
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
        className={`${getFieldClass(formSubmitted, state, 'form-check-input')} ${className}`}
        type="checkbox"
        name={state.name}
        value={value}
        checked={!!value}
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

export default Checkbox;
