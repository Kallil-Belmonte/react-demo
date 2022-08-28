import React from 'react';

import { ReactType } from '@/shared/files/types';
import { Icons } from '../Icon/types';
import Icon from '../Icon/Icon';
import './PageHeader.scss';

type Props = {
  icon?: Icons;
  children: ReactType;
};

const PageHeader = ({ icon, children }: Props) => {
  return (
    <section data-component="PageHeader">
      {icon && <Icon className="d-block mx-auto" name={icon} size="32px" />}
      <h1 className="title">{children}</h1>
    </section>
  );
};

export default React.memo(PageHeader);
