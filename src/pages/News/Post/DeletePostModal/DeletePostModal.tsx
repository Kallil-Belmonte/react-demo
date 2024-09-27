import type { FunctionComponent } from 'react';

import { Modal, Button } from '@/shared/components';

type Props = {
  open: boolean;
  onConfirm: React.MouseEventHandler<HTMLButtonElement>;
  onCancel: React.MouseEventHandler<HTMLButtonElement | HTMLDialogElement>;
};

const DeletePostModal: FunctionComponent<Props> = ({ open, onConfirm, onCancel }) => {
  return (
    <section data-component="DeletePostModal">
      <Modal
        open={open}
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
