import type { FunctionComponent } from 'react';

import type { UseField } from '@/shared/hooks';
import './Checkbox.scss';

type Props = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'onChange'
> &
  Pick<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'required' | 'disabled' | 'onChange'
  > & {
    label: string;
    name: string;
    field: UseField<any>;
  };

const Checkbox: FunctionComponent<Props> = ({
  label,
  name,
  required,
  disabled,
  onChange,
  field,
  ...otherProps
}) => {
  const { ref, value, setValue } = field;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.target.checked);
    onChange?.(event);
  };

  return (
    <div data-component="Checkbox" {...otherProps}>
      <label htmlFor={name}>{label}</label>
      <input
        ref={ref as React.MutableRefObject<HTMLInputElement>}
        type="checkbox"
        name={name}
        id={name}
        required={required}
        checked={value}
        disabled={disabled}
        onChange={handleChange}
      />

      {ref.current?.validationMessage && (
        <p className="validation-message">
          <strong>{ref.current.validationMessage}</strong>
        </p>
      )}
    </div>
  );
};

export default Checkbox;
