import { FunctionComponent } from 'react';

import { getFieldClass } from '@/shared/helpers';
import { UseField } from '@/shared/hooks';

type Props = {
  labelClass?: string;
  className?: string;
  field: UseField<any>;
  radios: { label: string; value: string }[];
  formSubmitted: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
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
  const { value, state, onSetValue } = field;
  const { errorMessages } = state;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    onSetValue(event.target.value);
    onChange?.(event);
  };

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
