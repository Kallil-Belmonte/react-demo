import { createSlice } from '@reduxjs/toolkit';
// import ACTION_TYPES from 'core/redux/actions/actionTypes';
// import updateState from './utility';

// const { LOG_IN, EDIT_ACCOUNT } = ACTION_TYPES;

// USER DATA
// export const userDataReducer = (state = {}, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case LOG_IN:
//       return updateState(state, payload);

//     case EDIT_ACCOUNT:
//       return updateState(state, payload);

//     default:
//       return state;
//   }
// };

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
    editAccount: (state, action) => {
      const { payload } = action;
      state.userData = payload;
    },
  },
});

export default authSlice.reducer;
