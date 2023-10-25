import { type FunctionComponent, useRef, useEffect } from 'react';

import { getFieldClass } from '@/shared/helpers';
import { UseField } from '@/shared/hooks';

type Props = {
  labelClass?: string;
  label: string;
  fieldClasses?: string;
  className?: string;
  rows?: number;
  field: UseField<any>;
  formSubmitted: boolean;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
};

const Input: FunctionComponent<Props> = ({
  labelClass = 'form-label',
  label,
  fieldClasses,
  rows = 3,
  field,
  formSubmitted,
  onChange,
  ...otherProps
}) => {
  const { value = '', ref, state, setValue } = field;
  const { errorMessages } = state;

  const changeEventRef = useRef<React.ChangeEvent<HTMLTextAreaElement>>();

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = event => {
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
      <textarea
        id={state.name}
        className={`${getFieldClass(formSubmitted, state, fieldClasses)}`}
        name={state.name}
        rows={rows}
        value={value}
        ref={ref as React.MutableRefObject<HTMLTextAreaElement>}
        onChange={handleChange}
        {...otherProps}
      ></textarea>
      {errorMessages.map(errorMessage => (
        <div key={errorMessage} className="invalid-feedback">
          {errorMessage}
        </div>
      ))}
    </>
  );
};

export default Input;
