import React from 'react';

import { ReactType, BootstrapVariants } from '@/shared/files/types';

type Props = {
  variant: BootstrapVariants;
  onDismiss: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactType;
};

const AppAlertDismissible = ({ variant, onDismiss, children }: Props) => {
  return (
    <div className={`alert alert-${variant} alert-dismissible fade show`} role="alert">
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

export default AppAlertDismissible;