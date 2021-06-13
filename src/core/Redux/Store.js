import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "core/Redux/RootReducer";

// REDUX PERSIST
const persistConfig = { key: "root", storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);

// STORE
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

// SUBSCRIBE
// store.subscribe(() => {
//   console.log('Subscribe:', store.getState());
// });
