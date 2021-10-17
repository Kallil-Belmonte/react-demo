import React from 'react';

import { ReactType } from '@/shared/files/types';
import { Icons } from '@/shared/components/AppIcon/types';
import AppIcon from '@/shared/components/AppIcon/AppIcon';
import './AppPageHeader.scss';

type Props = {
  icon?: Icons;
  children: ReactType;
};

const PageHeader = ({ icon, children }: Props) => {
  return (
    <section data-component="AppPageHeader">
      {icon && <AppIcon className="icon d-block mx-auto" icon={icon} size="32px" />}
      <h1 className="title">{children}</h1>
    </section>
  );
};

export default React.memo(PageHeader);
