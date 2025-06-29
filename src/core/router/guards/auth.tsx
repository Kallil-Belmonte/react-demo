import { type FunctionComponent, useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { isValidAuthToken, setPageTitle } from '@/shared/helpers';

type Props = { pageTitle: string; component: React.ReactNode };

const AuthGuard: FunctionComponent<Props> = ({ pageTitle, component }) => {
  const [render, setRender] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const validateAuth = async () => {
    const isAuthenticated = await isValidAuthToken();
    if (isAuthenticated) navigate('/');
    else setRender(true);
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    setPageTitle(pageTitle);
  }, [pageTitle]);

  useEffect(() => {
    validateAuth();
  }, [location.pathname]); // eslint-disable-line

  return render ? component : null;
};

export default AuthGuard;
