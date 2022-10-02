export type AccountFormState = {
  formSubmitted: boolean;
  successMessages: string[];
  serverErrors: {
    email: string[];
    request: string[];
  };
};
