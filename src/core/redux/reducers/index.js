import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from 'core/redux/reducers/auth';
import blogReducer from 'core/redux/reducers/blog';

// ROOT REDUCER
const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
});

// PERSISTED REDUCER
const persistConfig = { key: 'root', storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
