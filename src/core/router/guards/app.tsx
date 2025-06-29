import { type FunctionComponent, useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import Dashboard from '@/core/layout/Dashboard/Dashboard';
import { isValidAuthToken, setPageTitle } from '@/shared/helpers';

type Props = { pageTitle: string; component: React.ReactNode };

const AppGuard: FunctionComponent<Props> = ({ pageTitle, component }) => {
  const [render, setRender] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const validateAuth = async () => {
    const isAuthenticated = await isValidAuthToken();
    if (isAuthenticated) setRender(true);
    else navigate('/login');
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    setPageTitle(pageTitle);
  }, [pageTitle]);

  useEffect(() => {
    validateAuth();
  }, [location.pathname]); // eslint-disable-line

  return render ? <Dashboard>{component}</Dashboard> : null;
};

export default AppGuard;
