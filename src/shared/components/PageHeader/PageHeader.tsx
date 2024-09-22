import type { FunctionComponent } from 'react';

import type { ReactType } from '@/shared/files/types';
import type { Icons } from '../Icon/types';
import Icon from '../Icon/Icon';
import './PageHeader.scss';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
  icon?: Icons;
  children: ReactType;
};

const PageHeader: FunctionComponent<Props> = ({ icon, children, ...otherProps }) => {
  return (
    <section data-component="PageHeader" {...otherProps}>
      {icon && <Icon className="mx-auto" name={icon} size="32px" />}
      <h1 className="title">{children}</h1>
    </section>
  );
};

export default PageHeader;
