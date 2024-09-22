import { type FunctionComponent, useRef, useEffect } from 'react';

import { getFieldClass } from '@/shared/helpers';
import { UseField } from '@/shared/hooks';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  labelClass?: string;
  field: UseField<any>;
  radios: { label: string; value: string }[];
  formSubmitted: boolean;
};

const RadioButton: FunctionComponent<Props> = ({
  labelClass = 'form-check-label',
  className = '',
  field,
  radios,
  formSubmitted,
  onChange,
  ...otherProps
}) => {
  const { value, state, setValue } = field;
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
      {radios.map(radio => (
        <div
          key={radio.value}
          className={`${getFieldClass(
            formSubmitted,
            state,
            'form-check form-check-inline',
          )} ${className}`}
        >
          <label className={labelClass} htmlFor={radio.value}>
            {radio.label}
          </label>
          <input
            id={radio.value}
            className={`${getFieldClass(formSubmitted, state, 'form-check-input')} ${className}`}
            type="radio"
            name={state.name}
            value={radio.value}
            checked={value === radio.value}
            onChange={handleChange}
            {...otherProps}
          />
        </div>
      ))}
      {errorMessages.map(errorMessage => (
        <div key={errorMessage} className="invalid-feedback">
          {errorMessage}
        </div>
      ))}
    </>
  );
};

export default RadioButton;
