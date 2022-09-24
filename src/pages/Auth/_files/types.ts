import { ReactType } from '@/shared/files/types';

export type AuthProps = {
  children: ReactType;
};

export type FormState = {
  isLoading: boolean;
  isFormSubmitted: boolean;
  serverErrors: {
    email: string[];
    password: string[];
    request: string[];
  };
};
