import type { FunctionComponent } from 'react';

import { Button, Modal } from '@/shared/components';

type Props = {
  isOpen: boolean;
  onConfirm: React.MouseEventHandler<HTMLButtonElement>;
  onCancel: React.MouseEventHandler<HTMLButtonElement | HTMLDialogElement>;
};

const DeletePostModal: FunctionComponent<Props> = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <section data-component="DeletePostModal">
      <Modal
        isOpen={isOpen}
        title="Delete Confirmation"
        footer={
          <>
            <Button onClick={onConfirm}>Confirm</Button>
            <Button variant="base" onClick={onCancel}>
              Cancel
            </Button>
          </>
        }
        onClose={onCancel}
      >
        <article>
          <p>Are you sure you want to delete this post?</p>
        </article>
      </Modal>
    </section>
  );
};

export default DeletePostModal;
