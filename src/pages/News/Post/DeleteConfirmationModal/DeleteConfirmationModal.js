import React from 'react';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = (props) => {
  return (
    <Modal isOpen={props.isModalOpen} toggle={props.toggleModal} className="delete-confirmation-modal">
      <ModalHeader toggle={props.toggleModal}>Delete confirmation</ModalHeader>
      <ModalBody>
        <p className="text-center mb-0">Are you sure you want to delete this post?</p>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" type="button" onClick={props.delete}>Confirm</button>
        <button className="btn btn-light" type="button" onClick={props.toggleModal}>Cancel</button>
      </ModalFooter>
    </Modal>
  );
}

export default DeleteConfirmationModal;
