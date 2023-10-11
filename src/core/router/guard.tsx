import { useEffect } from 'react';

import { Navigate } from 'react-router-dom';

import type { ReactType } from '@/shared/files/types';
import { isValidAuthToken, setPageTitle } from '@/shared/helpers';
import Dashboard from '@/core/layout/Dashboard/Dashboard';

type Props = { pageTitle: string; component: ReactType };

const Guard = ({ pageTitle, component }: Props) => {
  const isValid = isValidAuthToken();

  // LIFECYCLE HOOKS
  useEffect(() => {
    setPageTitle(pageTitle);
  }, [pageTitle]);

  return isValid ? <Dashboard>{component}</Dashboard> : <Navigate to="/login" />;
};

export default Guard;
