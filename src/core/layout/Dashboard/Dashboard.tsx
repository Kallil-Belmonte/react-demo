import React, { Fragment } from 'react';

import { ReactType } from '@/shared/files/types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

type Props = {
  children: ReactType;
};

const Dashboard = ({ children }: Props) => {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
};

export default Dashboard;
