import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ACTION_TYPES from 'core/Redux/Actions/ActionTypes';
import { userDataReducer } from 'core/Redux/Reducers/Auth';
import { currentPostReducer } from 'core/Redux/Reducers/Post';
import { postsReducer, categoriesReducer } from 'core/Redux/Reducers/Blog';

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
  if (action.type === ACTION_TYPES.LOG_OUT) {
    return appReducer({}, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
