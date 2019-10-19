import React from 'react';

import { Modal, Button } from 'react-bootstrap';

const DeletePostModal = ({ isModalOpen, onCloseModal, onDelete }) => {
  return (
    <Modal className="delete-confirmation-modal" show={isModalOpen} onHide={() => onCloseModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Delete confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-center mb-0">Are you sure you want to delete this post?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => onDelete()}>Confirm</Button>
        <Button variant="light" onClick={() => onCloseModal()}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeletePostModal;
