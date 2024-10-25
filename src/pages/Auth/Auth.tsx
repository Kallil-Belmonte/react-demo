import type { FunctionComponent } from 'react';

import { Icon } from '@/shared/components';
import './Auth.scss';

type Props = {
  children: React.ReactNode;
};

const Auth: FunctionComponent<Props> = ({ children }) => {
  return (
    <main data-page="Auth">
      <div className="container">
        <Icon className="logo mx-auto" category="Brand" name="Logo" />

        <div className="row">
          <div className="col-md-6 offset-md-3">
            {children}

            <p className="disclaimer text-center mt-2 mb-0">Use any e-mail and password</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Auth;
