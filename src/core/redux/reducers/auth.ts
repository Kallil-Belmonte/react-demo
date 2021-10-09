import { createSlice } from '@reduxjs/toolkit';

import { clearStorageData } from '@/shared/helpers';

const initialState = {
  userData: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      const { payload } = action;
      state.userData = payload;
    },
    logOut: () => {
      clearStorageData();
    },
    editAccount: (state, action) => {
      const { payload } = action;
      state.userData = payload;
    },
  },
});

export const { logIn, logOut, editAccount } = authSlice.action;

export default authSlice.reducer;
