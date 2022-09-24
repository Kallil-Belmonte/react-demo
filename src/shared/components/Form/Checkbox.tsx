import { getFieldClass } from '@/shared/helpers';
import { UseField } from '@/shared/hooks';

type Props = {
  labelClass?: string;
  label: string;
  className?: string;
  trueValue: string | number | boolean;
  falseValue: string | number | boolean;
  field: UseField<any>;
  isFormSubmitted: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const Checkbox = ({
  labelClass = 'form-check-label',
  label,
  className = '',
  trueValue,
  falseValue,
  field,
  isFormSubmitted,
  onChange,
  ...otherProps
}: Props) => {
  const { value, ref, state, onSetValue } = field;
  const { errorMessages } = state;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    onSetValue(event.target.checked ? trueValue : falseValue);
    onChange?.(event);
  };

  return (
    <>
      <label className={labelClass} htmlFor={state.name}>
        {label}
      </label>
      <input
        id={state.name}
        className={`${getFieldClass(isFormSubmitted, state, 'form-check-input')} ${className}`}
        type="checkbox"
        name={state.name}
        value={value}
        checked={!!value}
        ref={ref}
        onChange={handleChange}
        {...otherProps}
      />
      {errorMessages.map(errorMessage => (
        <div key={errorMessage} className="invalid-feedback">
          {errorMessage}
        </div>
      ))}
    </>
  );
};

export default Checkbox;
