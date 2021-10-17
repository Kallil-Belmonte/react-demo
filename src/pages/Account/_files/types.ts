export type AccountFormState = {
  successMessages: string[];
  serverErrors: {
    email: string[];
    request: string[];
  };
};
