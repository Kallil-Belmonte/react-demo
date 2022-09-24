import { getFieldClass } from '@/shared/helpers';
import { UseField } from '@/shared/hooks';

type Props = {
  labelClass?: string;
  className?: string;
  field: UseField<any>;
  radios: { label: string; value: string }[];
  isFormSubmitted: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const RadioButton = ({
  labelClass = 'form-check-label',
  className = '',
  field,
  radios,
  isFormSubmitted,
  onChange,
  ...otherProps
}: Props) => {
  const { state, onSetValue } = field;
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
            isFormSubmitted,
            state,
            'form-check form-check-inline',
          )} ${className}`}
        >
          <label className={labelClass} htmlFor={radio.value}>
            {radio.label}
          </label>
          <input
            id={radio.value}
            className={`${getFieldClass(isFormSubmitted, state, 'form-check-input')} ${className}`}
            type="radio"
            name={state.name}
            value={radio.value}
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
