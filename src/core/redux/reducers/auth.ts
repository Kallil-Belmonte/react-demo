import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { LoginUser } from '@/core/services/auth/types';

type User = Pick<LoginUser, 'firstName' | 'lastName' | 'email'>;

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
