import { FunctionComponent } from 'react';

import { PageHeader } from '@/shared/components';
import Form from '@/pages/Account/Form/Form';
import './Account.scss';

const Account: FunctionComponent = () => {
  return (
    <main data-component="Account">
      <div className="container">
        <PageHeader icon="User">Account</PageHeader>
        <Form />
      </div>
    </main>
  );
};

export default Account;
