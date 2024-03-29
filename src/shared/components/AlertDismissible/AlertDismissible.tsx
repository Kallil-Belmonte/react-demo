import type { FunctionComponent } from 'react';

import type { ReactType, BootstrapVariants } from '@/shared/files/types';

type Props = {
  variant: BootstrapVariants;
  onDismiss: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactType;
};

const AlertDismissible: FunctionComponent<Props> = ({ variant, onDismiss, children }) => {
  return (
    <div
      data-component="alert-dismissible"
      className={`alert alert-${variant} fade show`}
      role="alert"
    >
      {children}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onDismiss}
      ></button>
    </div>
  );
};

export default AlertDismissible;
