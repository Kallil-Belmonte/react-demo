import type { FunctionComponent } from 'react';

import type { Icons } from '../Icon/types';
import Icon from '../Icon/Icon';
import './IconButton.scss';

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon: Icons;
  size?: string;
  color?: string;
  disabled?: boolean;
};

const IconButton: FunctionComponent<Props> = ({
  style = {},
  className = '',
  icon,
  size = '20px',
  color,
  disabled,
  ...otherProps
}) => {
  return (
    <button
      data-component="IconButton"
      style={{ width: size, height: size, ...style }}
      className={`flex-center ${className}`}
      type="button"
      disabled={disabled}
      {...otherProps}
    >
      <Icon name={icon} color={color} />
    </button>
  );
};

export default IconButton;
