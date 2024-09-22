import type { FunctionComponent } from 'react';

import { PageHeader } from '@/shared/components';
import Form from '@/pages/Contact/Form/Form';
import './Contact.scss';

const Contact: FunctionComponent = () => {
  return (
    <main data-page="Contact">
      <div className="container">
        <PageHeader icon="Envelope">Contact</PageHeader>
        <Form />
      </div>
    </main>
  );
};

export default Contact;
