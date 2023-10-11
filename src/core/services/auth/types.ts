export type RegisterUserPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginUserPayload = {
  email: string;
  password: string;
  keepLogged: boolean;
};

export type LoggedUser = {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
};
