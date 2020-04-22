import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ACTION_TYPES from 'core/Redux/Actions/ActionTypes';
import { userDataReducer } from 'core/Redux/Reducers/Auth';
import { currentPostReducer } from 'core/Redux/Reducers/Post';
import { postsReducer, categoriesReducer } from 'core/Redux/Reducers/Blog';

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
  currentPost: currentPostReducer,
  posts:       postsReducer,
  categories:  categoriesReducer,
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
