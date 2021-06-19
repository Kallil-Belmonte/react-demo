import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from 'core/redux/rootReducer';

// REDUX PERSIST
const persistConfig = { key: 'root', storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);

// STORE
export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
export const persistor = persistStore(store);

// SUBSCRIBE
// store.subscribe(() => {
//   console.log('Subscribe:', store.getState());
// });
