import React from 'react';

import { Container } from 'react-bootstrap';

import Dashboard from 'layout/Dashboard';
import PageHeader from 'shared/components/PageHeader/PageHeader';
import ContactForm from 'pages/Contact/ContactForm/ContactForm';
import './Contact.scss';

const Contact = () => {
  return (
    <Dashboard>
      <main data-component="Contact">
        <Container>
          <PageHeader title="Contact" icon="envelope" />

          <ContactForm />
        </Container>
      </main>
    </Dashboard>
  );
};

export default Contact;
