import type { FunctionComponent } from 'react';

import { UseField } from '@/shared/hooks';

type Props = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'onChange'
> &
  Pick<
    React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
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
    name: string;
    field: UseField<any>;
  };

const Textarea: FunctionComponent<Props> = ({
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
        ref={ref as React.MutableRefObject<HTMLTextAreaElement>}
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

      {ref.current?.validationMessage && (
        <p className="validation-message">
          <strong>{ref.current.validationMessage}</strong>
        </p>
      )}
    </div>
  );
};

export default Textarea;
