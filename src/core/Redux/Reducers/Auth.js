import ACTION_TYPES from 'core/Redux/Actions/ActionTypes';
import updateState from './Utility';

const { LOG_IN, EDIT_ACCOUNT } = ACTION_TYPES;

// USER DATA
export const userDataReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOG_IN:
      return updateState(state, payload);

    case EDIT_ACCOUNT:
      return updateState(state, payload);

    default:
      return state;
  }
};
