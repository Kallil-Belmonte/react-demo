import ACTION_TYPES from 'core/Redux/Actions/ActionTypes';
import updateState from './Utility';

const { LOG_IN, EDIT_ACCOUNT } = ACTION_TYPES;

// USER DATA
export const userDataReducer = (state = {}, action) => {
  switch (action.type) {
    case LOG_IN:
      return updateState(state, action.payload);

    case EDIT_ACCOUNT:
      return updateState(state, action.payload);

    default:
      return state;
  }
};
