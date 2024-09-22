import type { FunctionComponent } from 'react';

import { UseField } from '@/shared/hooks';
import './Checkbox.scss';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  Pick<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'name' | 'required' | 'disabled' | 'onChange'
  > & {
    label: string;
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
      <div className="box"></div>

      {ref.current.validationMessage && (
        <p className="validation-message">
          <strong>{ref.current.validationMessage}</strong>
        </p>
      )}
    </div>
  );
};

export default Checkbox;
