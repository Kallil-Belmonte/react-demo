// import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

import persistedReducer from 'core/redux/reducers';
// import rootReducer from 'core/redux/rootReducer';

// // REDUX PERSIST
// const persistConfig = { key: 'root', storage };
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// STORE
// export const store = createStore(
//   persistedReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// );
export const store = configureStore({
  reducer: persistedReducer,
  devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// SUBSCRIBE
// store.subscribe(() => {
//   console.log('Subscribe:', store.getState());
// });
