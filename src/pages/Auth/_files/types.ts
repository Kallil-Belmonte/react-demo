export type LoginFormState = {
  isLoading: boolean;
  serverErrors: {
    [key: string]: string[];
  };
};

// export type RegisterFormState = {
//   isLoading: boolean;
//   firstName: VueHooksFormField;
//   lastName: VueHooksFormField;
//   email: VueHooksFormField;
//   password: VueHooksFormField;
//   serverErrors: {
//     email: string[];
//     password: string[];
//     request: string[];
//   };
// };
