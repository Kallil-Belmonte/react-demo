import { combineReducers } from 'redux';

import ACTION_TYPES from 'core/redux/actions/actionTypes';
import { userDataReducer } from 'core/redux/reducers/auth';
import { categoriesReducer, postsReducer } from 'core/redux/reducers/blog';
import { currentPostReducer } from 'core/redux/reducers/post';

const { LOG_OUT } = ACTION_TYPES;

export const clearStorageData = () => {
  sessionStorage.removeItem('authTokenReactDemo');
  localStorage.removeItem('authTokenReactDemo');
  localStorage.removeItem('expirationDateReactDemo');
};

// APP REDUCER
const appReducer = combineReducers({
  userData: userDataReducer,
  categories: categoriesReducer,
  posts: postsReducer,
  currentPost: currentPostReducer,
});

// ROOT REDUCER
const rootReducer = (state, action) => {
  switch (action.type) {
    case LOG_OUT:
      clearStorageData();
      return appReducer({}, action);

    default:
      return appReducer(state, action);
  }
};

export default rootReducer;
