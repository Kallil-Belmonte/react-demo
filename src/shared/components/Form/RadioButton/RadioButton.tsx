import type { FunctionComponent } from 'react';

import type { UseField } from '@/shared/hooks';
import './RadioButton.scss';

type Props = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'onChange'
> &
  Pick<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'required' | 'disabled' | 'onChange'
  > & {
    title: string;
    name: string;
    radios: { label: string; value: string }[];
    field: UseField<any>;
  };

const RadioButton: FunctionComponent<Props> = ({
  title,
  name,
  required,
  disabled,
  radios,
  onChange,
  field,
  ...otherProps
}) => {
  const { ref, value, setValue } = field;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.target.value);
    onChange?.(event);
  };

  return (
    <div data-component="RadioButton" {...otherProps}>
      <div className="title-wrapper">
        <p className="title">{title}</p>
      </div>

      <div className="d-flex align-items-center items">
        {radios.map(radio => (
          <div key={radio.label} className="d-flex item">
            <label htmlFor={radio.value}>{radio.label}</label>
            <input
              ref={ref as React.MutableRefObject<HTMLInputElement>}
              id={radio.value}
              type="radio"
              name={name}
              value={radio.value}
              checked={value === radio.value}
              required={required}
              disabled={disabled}
              onChange={handleChange}
            />
            <div className="radio" />
          </div>
        ))}
      </div>

      {ref.current?.validationMessage && (
        <p className="validation-message">
          <strong>{ref.current.validationMessage}</strong>
        </p>
      )}
    </div>
  );
};

export default RadioButton;
