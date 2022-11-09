import { Navigate } from 'react-router-dom';

import type { ReactType } from '@/shared/files/types';
import { clearStorageData, isExpiredSession, setPageTitle } from '@/shared/helpers';
import Dashboard from '@/core/layout/Dashboard/Dashboard';

type Props = { pageTitle: string; component: ReactType };

const Guard = ({ pageTitle, component }: Props) => {
  if (isExpiredSession()) {
    clearStorageData();
    return <Navigate to="/login" />;
  }

  setPageTitle(pageTitle);
  return <Dashboard>{component}</Dashboard>;
};

export default Guard;
