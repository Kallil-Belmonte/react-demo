import type { FunctionComponent } from 'react';

import { type To, useNavigate } from 'react-router-dom';

import type { Variant } from '@/shared/files/types';
import type { Icons } from '../Icon/types';
import Icon from '../Icon/Icon';
import './Button.scss';

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: Variant | 'icon' | 'icon-primary' | 'icon-secondary';
  route?: To;
  icon?: { name: Icons; color?: string; size?: string };
  loading?: boolean;
};

const Button: FunctionComponent<Props> = ({
  className = '',
  type = 'button',
  variant = 'primary',
  route,
  icon,
  loading,
  disabled,
  onClick,
  children,
  ...otherProps
}) => {
  const { name, color, size = '20px' } = icon || {};

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
      {loading && <Icon name="Loading" color="#fff" />}
      {!loading && name && <Icon name={name} color={color} size={size} />}
      {!loading && children}
    </button>
  );
};

export default Button;
