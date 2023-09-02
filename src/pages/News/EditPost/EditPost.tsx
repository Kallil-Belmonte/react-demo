import type { FunctionComponent } from 'react';

import Form from '@/pages/News/EditPost/Form/Form';

const EditPost: FunctionComponent = () => {
  return (
    <main data-page="edit-post">
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <Form />
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditPost;
