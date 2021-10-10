import React, { Fragment } from 'react';

import { ReactType } from '@/shared/files/types';
import AppHeader from '../AppHeader/AppHeader';
import AppFooter from '../AppFooter/AppFooter';

type Props = {
  children: ReactType;
};

const AppDashboard = ({ children }: Props) => {
  return (
    <Fragment>
      <AppHeader />
      {children}
      <AppFooter />
    </Fragment>
  );
};

export default AppDashboard;
