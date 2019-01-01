import ACTION_TYPES from '../Actions/ActionTypes';
import updateState from './Utility';

// CURRENT POST
export const currentPostReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CURRENT_POST:
      return updateState(state, action.payload);

    case ACTION_TYPES.EDIT_CURRENT_POST:
      return updateState(state, action.payload);

    default:
      return state;
  }
};
