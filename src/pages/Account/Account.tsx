import React from 'react';

import AppPageHeader from '@/shared/components/AppPageHeader/AppPageHeader';
import Form from '@/pages/Account/Form/Form';
import './Account.scss';

const Account = () => {
  return (
    <main data-component="Account">
      <div className="container">
        <AppPageHeader icon="User">Account</AppPageHeader>
        <Form />
      </div>
    </main>
  );
};

export default Account;
