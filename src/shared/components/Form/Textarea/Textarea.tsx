import { type FunctionComponent, useRef, useEffect } from 'react';

import { UseField } from '@/shared/hooks';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  Pick<
    React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
    | 'name'
    | 'required'
    | 'minLength'
    | 'maxLength'
    | 'placeholder'
    | 'rows'
    | 'cols'
    | 'disabled'
    | 'onChange'
  > & {
    label: string;
    field: UseField<any>;
  };

const Input: FunctionComponent<Props> = ({
  label,
  name,
  required,
  minLength,
  maxLength,
  placeholder,
  rows = 4,
  cols,
  disabled,
  onChange,
  field,
  ...otherProps
}) => {
  const { ref, value = '', setValue } = field;

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = event => {
    setValue(event.target.value);
    onChange?.(event);
  };

  return (
    <div data-component="Textarea" className="form-field" {...otherProps}>
      <div className="label-wrapper">
        <label htmlFor={name}>{label}</label>
      </div>

      <textarea
        ref="field"
        v-model="model"
        name={name}
        id={name}
        rows={rows}
        cols={cols}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={handleChange}
      ></textarea>

      {ref.current.validationMessage && (
        <p className="validation-message">
          <strong>{ref.current.validationMessage}</strong>
        </p>
      )}
    </div>
  );
};

export default Input;
