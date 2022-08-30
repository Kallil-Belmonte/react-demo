import { MOCKY_URL } from '@/core/services/_files/endpoints';
import request from '@/core/services/_files/request';
import { RegisterUserPayload, RegisterUser, LoginUserPayload, LoginUser, User } from './types';

const { stringify } = JSON;

export const registerUser = async (body: RegisterUserPayload): Promise<RegisterUser> =>
  request(() =>
    fetch(`${MOCKY_URL}/addea4ca-7665-43ba-a4b3-5f6e660dba7b`, {
      method: 'POST',
      body: stringify(body),
    }),
  );

export const loginUser = async (body: LoginUserPayload): Promise<LoginUser> =>
  request(() =>
    fetch(`${MOCKY_URL}/2e116a57-776c-46e2-9114-48cdb18e0965`, {
      method: 'POST',
      body: stringify(body),
    }),
  );

export const getUser = async (id: string): Promise<User> =>
  request(() =>
    fetch(`${MOCKY_URL}/f11a346c-0685-40e7-829d-5a4322850c35?${new URLSearchParams({ id })}`),
  );
