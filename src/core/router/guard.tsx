import { type FunctionComponent, useState, useEffect } from 'react';

import { Navigate } from 'react-router-dom';

import { isValidAuthToken, setPageTitle } from '@/shared/helpers';
import Dashboard from '@/core/layout/Dashboard/Dashboard';

type Props = { pageTitle: string; component: React.ReactNode };

const Guard: FunctionComponent<Props> = ({ pageTitle, component }) => {
  const [isValid, setIsValid] = useState(false);

  const validate = async () => {
    const result = await isValidAuthToken();
    setIsValid(result);
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    validate();
  }, []);

  useEffect(() => {
    setPageTitle(pageTitle);
  }, [pageTitle]);

  return isValid ? <Dashboard>{component}</Dashboard> : <Navigate to="/login" />;
};

export default Guard;
