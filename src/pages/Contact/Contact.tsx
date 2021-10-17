import React from 'react';

import AppPageHeader from '@/shared/components/AppPageHeader/AppPageHeader';
import ContactForm from '@/pages/Contact/ContactForm/ContactForm';
import './Contact.scss';

const Contact = () => {
  return (
    <main data-component="Contact">
      <div className="container">
        <AppPageHeader icon="Envelope">Contact</AppPageHeader>
        <ContactForm />
      </div>
    </main>
  );
};

export default Contact;
