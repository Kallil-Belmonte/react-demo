// import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { AUTH_TOKEN_KEY, EXPIRATION_DATE_KEY } from 'shared/files/consts';
// import ACTION_TYPES from 'core/redux/actions/actionTypes';
import authReducer from 'core/redux/reducers/auth';
import blogReducer from 'core/redux/reducers/blog';
// import { userDataReducer } from 'core/redux/reducers/auth';
// import { categoriesReducer, postsReducer } from 'core/redux/reducers/blog';
// import { currentPostReducer } from 'core/redux/reducers/post';

// const { LOG_OUT } = ACTION_TYPES;

export const clearStorageData = () => {
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(EXPIRATION_DATE_KEY);
};

// APP REDUCER
// const appReducer = combineReducers({
//   userData: userDataReducer,
//   categories: categoriesReducer,
//   posts: postsReducer,
//   currentPost: currentPostReducer,
// });

// ROOT REDUCER
// const rootReducer = (state, action) => {
//   switch (action.type) {
//     case LOG_OUT:
//       clearStorageData();
//       return appReducer({}, action);

//     default:
//       return appReducer(state, action);
//   }
// };

// ROOT REDUCER
const rootReducer = {
  auth: authReducer,
  blog: blogReducer,
};

// REDUX PERSIST
const persistConfig = { key: 'root', storage };
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
