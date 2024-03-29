import { type FunctionComponent, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import type { AuthProps } from '@/pages/Auth/_files/types';
import { redirectLoggedUser } from '@/shared/helpers';
import { Icon } from '@/shared/components';
import './Auth.scss';

const Auth: FunctionComponent<AuthProps> = ({ children }) => {
  const navigate = useNavigate();

  // LIFECYCLE HOOKS
  useEffect(() => {
    redirectLoggedUser(navigate);
  }, []);

  return (
    <main data-page="auth">
      <div className="container">
        <Icon className="logo mx-auto" category="Brand" name="Logo" />

        <div className="row">
          <div className="col-md-6 offset-md-3">
            {children}

            <p className="disclaimer text-center mt-2 mb-0">Use any e-mail and password</p>
            <p className="disclaimer text-center mb-0">
              To see the error alerts use the e-mail: demo@demo.com
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Auth;
