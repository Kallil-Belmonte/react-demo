import React, { Fragment } from 'react';

import { useHistory } from 'react-router-dom';

import { ReactType } from '@/shared/files/types';
import { setPageTitle } from '@/shared/helpers';
import AppHeader from '../AppHeader/AppHeader';
import AppFooter from '../AppFooter/AppFooter';

type Props = {
  children: ReactType;
};

const AppDashboard = ({ children }: Props) => {
  const history = useHistory();

  history.listen(location => {
    const pathname = location.pathname.replace(/\//, '');
    const pageTitle =
      pathname
        .split('-')
        .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
        .join(' ') || 'Home';
    setPageTitle(pageTitle);
  });

  return (
    <Fragment>
      <AppHeader />
      {children}
      <AppFooter />
    </Fragment>
  );
};

export default AppDashboard;
