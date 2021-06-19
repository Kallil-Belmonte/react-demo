import React from 'react';

import { Modal, Button } from 'react-bootstrap';

const { Header, Title, Body, Footer } = Modal;

const DeletePostModal = ({ isModalOpen, onDelete, onCloseModal }) => {
  return (
    <Modal className="delete-confirmation-modal" show={isModalOpen} onHide={onCloseModal}>
      <Header closeButton>
        <Title>Delete confirmation</Title>
      </Header>
      <Body>
        <p className="text-center mb-0">Are you sure you want to delete this post?</p>
      </Body>
      <Footer>
        <Button variant="primary" onClick={onDelete}>Confirm</Button>
        <Button variant="light" onClick={onCloseModal}>Cancel</Button>
      </Footer>
    </Modal>
  );
}

export default DeletePostModal;
