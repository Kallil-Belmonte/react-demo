import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { AuthProps } from '@/pages/Auth/_files/types';
import { redirectLoggedUser } from '@/shared/helpers';
import Logo from '@/assets/icons/brand/logo.svg';
import './Auth.scss';

const Auth = ({ children }: AuthProps) => {
  const history = useHistory();

  // LIFECYCLE HOOKS
  useEffect(() => {
    redirectLoggedUser(history);
  }, []);

  return (
    <main data-component="Auth">
      <div className="container">
        <img src={Logo} className="logo d-block mx-auto" alt="React" />

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
