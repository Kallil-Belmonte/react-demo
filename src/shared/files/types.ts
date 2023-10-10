import { ReactNode } from 'react';

export type ObjectType = { [key: string]: any };

export type ReactType = ReactNode | ReactNode[];

export type BootstrapVariants =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';
