import { useEffect } from 'react';

import { Navigate } from 'react-router-dom';

import { isValidAuthToken, setPageTitle } from '@/shared/helpers';
import Dashboard from '@/core/layout/Dashboard/Dashboard';

type Props = { pageTitle: string; component: React.ReactNode };

const Guard = async ({ pageTitle, component }: Props) => {
  const isValid = await isValidAuthToken();

  // LIFECYCLE HOOKS
  useEffect(() => {
    setPageTitle(pageTitle);
  }, [pageTitle]);

  return isValid ? <Dashboard>{component}</Dashboard> : <Navigate to="/login" />;
};

export default Guard;
