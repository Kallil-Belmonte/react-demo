import React from 'react';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DeletePostModal = ({ isModalOpen, onToggleModal, onDelete }) => {
  return (
    <Modal isOpen={isModalOpen} toggle={() => onToggleModal()} className="delete-confirmation-modal">
      <ModalHeader toggle={() => onToggleModal()}>Delete confirmation</ModalHeader>
      <ModalBody>
        <p className="text-center mb-0">Are you sure you want to delete this post?</p>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" type="button" onClick={() => onDelete()}>Confirm</button>
        <button className="btn btn-light" type="button" onClick={() => onToggleModal()}>Cancel</button>
      </ModalFooter>
    </Modal>
  );
}

export default DeletePostModal;
