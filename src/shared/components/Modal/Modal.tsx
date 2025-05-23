import { type FunctionComponent, useEffect, useRef } from 'react';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import type { Icons } from '../Icon/types';
import './Modal.scss';

type Props = Omit<
  React.DetailedHTMLProps<React.DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>,
  'onClose'
> & {
  icon?: Icons;
  isOpen: boolean;
  footer: React.ReactNode;
  onClose: React.MouseEventHandler<HTMLButtonElement | HTMLDialogElement>;
};

const Modal: FunctionComponent<Props> = ({ icon, isOpen, title, footer, children, onClose }) => {
  const dialog = useRef<HTMLDialogElement>(null);

  const handleClick: React.MouseEventHandler<HTMLDialogElement> = event => {
    if (event.target === dialog.current) onClose(event);
  };

  const toggleModal = () => {
    if (isOpen) dialog.current?.showModal();
    else dialog.current?.close();
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    toggleModal();
  }, [isOpen]); // eslint-disable-line

  return (
    <dialog ref={dialog} data-component="Modal" aria-modal="true" onClick={handleClick}>
      <header>
        <div className="title">
          {icon && <Icon name={icon} size="30px" />}
          <h3>{title}</h3>
        </div>
        <Button icon={{ name: 'Close' }} onClick={onClose} />
      </header>
      <section className="body">{children}</section>
      <footer>{footer}</footer>
    </dialog>
  );
};

export default Modal;
