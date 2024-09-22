import type { FunctionComponent } from 'react';

import { type To, useNavigate } from 'react-router-dom';

import type { Variant } from '@/shared/files/types';
import Icon from '../Icon/Icon';
import './Button.scss';

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: Variant;
  route?: To;
  loading?: boolean;
};

const Button: FunctionComponent<Props> = ({
  className = '',
  type = 'button',
  variant = 'primary',
  route,
  loading,
  disabled,
  onClick,
  children,
  ...otherProps
}) => {
  const navigate = useNavigate();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = event => {
    onClick?.(event);
    if (route) navigate(route);
  };

  return (
    <button
      data-component="Button"
      className={`${variant} ${className}`}
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      {...otherProps}
    >
      {loading ? <Icon className="mx-auto" name="Loading" color="#fff" size="30px" /> : children}
    </button>
  );
};

export default Button;
