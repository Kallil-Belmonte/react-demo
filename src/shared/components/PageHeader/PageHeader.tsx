import { type FunctionComponent, memo } from 'react';

import type { ReactType } from '@/shared/files/types';
import type { Icons } from '../Icon/types';
import Icon from '../Icon/Icon';
import './PageHeader.scss';

type Props = {
  icon?: Icons;
  children: ReactType;
};

const PageHeader: FunctionComponent<Props> = ({ icon, children }) => {
  return (
    <section data-component="page-header">
      {icon && <Icon className="mx-auto" name={icon} size="32px" />}
      <h1 className="title">{children}</h1>
    </section>
  );
};

export default memo(PageHeader);
