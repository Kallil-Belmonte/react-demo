export type FormState = {
  isLoading: boolean;
  serverErrors: {
    [key: string]: string[];
  };
};
