import { type FunctionComponent, useRef, useEffect } from 'react';

import type { Icons } from '../Icon/types';
import Icon from '../Icon/Icon';
import IconButton from '../IconButton/IconButton';
import './Modal.scss';

type Props = React.DetailedHTMLProps<
  React.DialogHTMLAttributes<HTMLDialogElement>,
  HTMLDialogElement
> & {
  open: boolean;
  icon?: Icons;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
};

const Modal: FunctionComponent<Props> = ({ open, icon, title, onClose }) => {
  const dialog = useRef<HTMLDialogElement>();

  const handleClick: React.MouseEventHandler<HTMLDialogElement> = event => {
    if (event.target === dialog.current) onClose(event);
  };

  const toggleModal = () => {
    if (!dialog.current) return;

    if (open) {
      dialog.current.showModal();
      dialog.current.querySelector<HTMLButtonElement>('button')?.blur();
    } else {
      dialog.current.close();
    }
  };

  // LIFECYCLE HOOKS
  useEffect(() => {
    toggleModal();
  }, [open]);

  if (!open) return null;

  return (
    <dialog data-component="Modal" aria-modal="true" onClick={handleClick}>
      <header>
        <div className="title">
          {icon && <Icon name={icon} size="30px" />}
          <h3>{title}</h3>
        </div>
        <IconButton icon="Close" onClick={onClose} />
      </header>
      <section className="body">
        <slot></slot>
      </section>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </dialog>
  );
};

export default Modal;
