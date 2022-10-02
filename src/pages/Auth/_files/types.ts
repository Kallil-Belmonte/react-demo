import { ReactType } from '@/shared/files/types';

export type AuthProps = {
  children: ReactType;
};

export type FormState = {
  loading: boolean;
  formSubmitted: boolean;
  serverErrors: {
    email: string[];
    password: string[];
    request: string[];
  };
};
