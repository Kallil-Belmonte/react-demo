import { AUTH_TOKEN } from '@/shared/files/consts';
import type { RegisterUserPayload, LoginUserPayload, LoggedUser, User } from './types';

export const registerUser = async (body: RegisterUserPayload): Promise<LoggedUser> => ({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@gmail.com',
  token: AUTH_TOKEN,
});

export const loginUser = async (body: LoginUserPayload): Promise<LoggedUser> => ({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@gmail.com',
  token: AUTH_TOKEN,
});

export const getUser = async (id: string): Promise<User> => ({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@gmail.com',
});
