import type { FunctionComponent } from 'react';

import type { Status } from '@/shared/files/types';
import { getIcon } from '@/shared/helpers';
import Icon from '../Icon/Icon';
import IconButton from '../IconButton/IconButton';
import './Alert.scss';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  status?: Status;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

const Alert: FunctionComponent<Props> = ({
  className = '',
  status = 'info',
  onClose,
  children,
  ...otherProps
}) => {
  return (
    <div data-component="Alert" role="alert" className={`${status} ${className}`} {...otherProps}>
      <Icon name={getIcon(status)} size="25px" />
      <div className="content">{children}</div>
      <IconButton v-if="close" icon="Close" size="15px" onClick={onClose} />
    </div>
  );
};

export default Alert;
