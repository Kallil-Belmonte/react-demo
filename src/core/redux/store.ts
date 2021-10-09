import { configureStore } from '@reduxjs/toolkit';

import reducer from './reducers';

// VER: https://redux-toolkit.js.org/api/configureStore

const store = configureStore({
  reducer,
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  // preloadedState,
});

// SUBSCRIBE
// store.subscribe(() => {
//   console.log('Subscribe:', store.getState());
// });

export default store;
