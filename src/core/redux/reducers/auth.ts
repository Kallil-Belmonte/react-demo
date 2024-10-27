import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { LoggedUser } from '@/core/services/auth/types';

type User = Pick<LoggedUser, 'firstName' | 'lastName' | 'email'>;

export type AuthState = {
  user: User;
};

const initialState: AuthState = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      const { payload } = action;
      state.user = payload;
    },
    resetUser: state => {
      state.user = {
        firstName: '',
        lastName: '',
        email: '',
      };
    },
  },
});

export const { setUser, resetUser } = authSlice.actions;
export default authSlice.reducer;
