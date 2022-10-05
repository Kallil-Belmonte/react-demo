import { FunctionComponent } from 'react';

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
  const { value = '', ref, state, onSetValue } = field;
  const { errorMessages } = state;

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = event => {
    onSetValue(event.target.value);
    onChange?.(event);
  };

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
        ref={ref as React.LegacyRef<HTMLTextAreaElement>}
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
