export type AccountFormState = {
  isFormSubmitted: boolean;
  successMessages: string[];
  serverErrors: {
    email: string[];
    request: string[];
  };
};
