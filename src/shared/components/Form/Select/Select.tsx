import { type FunctionComponent, useState, useEffect } from 'react';

import { removeAccent } from '@/shared/helpers';
import { UseField } from '@/shared/hooks';
import IconButton from '@/shared/components/IconButton/IconButton';
import './Select.scss';

type Option = {
  text: string;
  value: string;
  disabled?: boolean;
};

type Props = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'onChange'
> &
  Pick<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
    'required' | 'disabled'
  > & {
    label: string;
    name: string;
    options: Option[];
    onChange?: (value: string, event: React.FocusEvent<HTMLInputElement, Element>) => void;
    field: UseField<any>;
  };

const Select: FunctionComponent<Props> = ({
  label,
  name,
  required,
  options,
  disabled,
  field,
  onChange,
  ...otherProps
}) => {
  const { ref, value = '', setValue } = field;

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Props['options']>([]);

  const isSelected = (valueParam: string) => valueParam === value;

  const format = (text: string) => removeAccent(text.toLowerCase());

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.target as HTMLInputElement;
    setInputValue(value);
    setFilteredOptions(options.filter(option => format(option.text).includes(format(value))));
  };

  const handleOpenSelect = () => {
    setOpen(true);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = event => {
    const target = event.target as HTMLInputElement;

    setTimeout(() => {
      const option = options.find(option => format(option.text) === format(target.value));

      if (option) {
        setValue(option.value);
        setInputValue(option.text);
        onChange?.(option.value, event);
      } else {
        setValue('');
        setInputValue('');
      }

      setOpen(false);
    }, 100);
  };

  const select = (option: Option) => {
    if (option.disabled) return;
    setValue(option.value);
    setInputValue(option.text);
  };

  const setData = () => {
    setInputValue(options.find(option => option.value === value)?.text || '');
    setFilteredOptions(options);
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    setData();
  }, [options]);

  return (
    <div data-component="Select" className="form-field" {...otherProps}>
      <div className="label-wrapper">
        <label htmlFor={name}>{label}</label>
      </div>

      <input
        ref={ref as React.MutableRefObject<HTMLInputElement>}
        type="text"
        name={name}
        id={name}
        required={required}
        placeholder="Select"
        disabled={disabled}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleOpenSelect}
        onBlur={handleBlur}
      />
      <IconButton icon="ArrowDown" size="15px" onClick={handleOpenSelect} />
      <div role="listbox" tabIndex={0} aria-label="Options" aria-hidden={!open}>
        {filteredOptions.map(option => (
          <div
            key={option.value}
            role="option"
            aria-selected={isSelected(option.value)}
            aria-disabled={option.disabled}
            onClick={() => select(option)}
          >
            {option.text}
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

export default Select;
