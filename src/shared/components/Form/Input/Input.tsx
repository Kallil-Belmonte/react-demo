import type { FunctionComponent } from 'react';

import type { UseField } from '@/shared/hooks';
import type { Icons } from '@/shared/components/Icon/types';
import Icon from '@/shared/components/Icon/Icon';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  Pick<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    | 'type'
    | 'name'
    | 'required'
    | 'pattern'
    | 'min'
    | 'max'
    | 'minLength'
    | 'maxLength'
    | 'placeholder'
    | 'disabled'
    | 'onChange'
  > & {
    icon?: Icons;
    label: string;
    field: UseField<any>;
  };

const Input: FunctionComponent<Props> = ({
  icon,
  label,
  type = 'text',
  name,
  required,
  pattern,
  min,
  max,
  minLength,
  maxLength,
  placeholder,
  disabled,
  onChange,
  field,
  ...otherProps
}) => {
  const { ref, value = '', setValue } = field;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.target.value);
    onChange?.(event);
  };

  return (
    <div data-component="Input" className="form-field" {...otherProps}>
      <div className="label-wrapper">
        <label htmlFor="name">{label}</label>
      </div>

      {icon && <Icon name={icon} />}

      <input
        ref={ref as React.MutableRefObject<HTMLInputElement>}
        type={type}
        name={name}
        id={name}
        required={required}
        pattern={pattern}
        min={min}
        max={max}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={handleChange}
      />

      {ref.current.validationMessage && (
        <p className="validation-message">
          <strong>{ref.current.validationMessage}</strong>
        </p>
      )}
    </div>
  );
};

export default Input;
