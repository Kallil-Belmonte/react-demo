import React from 'react';

import { Container } from 'react-bootstrap';

import Dashboard from 'layout/Dashboard';
import PageHeader from 'shared/Components/PageHeader/PageHeader';
import AccountForm from 'pages/Account/AccountForm/AccountForm';
import './Account.scss';

const Account = () => {
  return (
    <Dashboard>
      <main data-component="Account">
        <Container>
          <PageHeader title="Account" icon="user" />

          <AccountForm />
        </Container>
      </main>
    </Dashboard>
  );
};

export default Account;
