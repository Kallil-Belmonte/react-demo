import ACTION_TYPES from 'core/Redux/Actions/ActionTypes';
import updateState from './Utility';

// USER DATA
export const userDataReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOG_IN:
      return updateState(state, action.payload);

    case ACTION_TYPES.EDIT_ACCOUNT:
      return updateState(state, action.payload);

    default:
      return state;
  }
};
