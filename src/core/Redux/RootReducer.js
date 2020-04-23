import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ACTION_TYPES from 'core/Redux/Actions/ActionTypes';
import { userDataReducer } from 'core/Redux/Reducers/Auth';
import { categoriesReducer, postsReducer } from 'core/Redux/Reducers/Blog';
import { currentPostReducer } from 'core/Redux/Reducers/Post';

const { LOG_OUT } = ACTION_TYPES;

export const clearStorageData = () => {
  sessionStorage.removeItem('authTokenReactDemo');
  localStorage.removeItem('authTokenReactDemo');
  localStorage.removeItem('expirationDateReactDemo');
};

// APP REDUCER
const appReducer = combineReducers({
  form:        formReducer,
  userData:    userDataReducer,
  categories:  categoriesReducer,
  posts:       postsReducer,
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
