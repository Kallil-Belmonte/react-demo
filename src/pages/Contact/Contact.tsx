import React from 'react';

import AppPageHeader from '@/shared/components/AppPageHeader/AppPageHeader';
import Form from '@/pages/Contact/Form/Form';
import './Contact.scss';

const Contact = () => {
  return (
    <main data-component="Contact">
      <div className="container">
        <AppPageHeader icon="Envelope">Contact</AppPageHeader>
        <Form />
      </div>
    </main>
  );
};

export default Contact;
