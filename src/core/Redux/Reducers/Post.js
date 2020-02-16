import ACTION_TYPES from 'core/Redux/Actions/ActionTypes';
import updateState from './Utility';

const { SET_CURRENT_POST, EDIT_CURRENT_POST } = ACTION_TYPES;

// CURRENT POST
export const currentPostReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_POST:
      return updateState(state, action.payload);

    case EDIT_CURRENT_POST:
      return updateState(state, action.payload);

    default:
      return state;
  }
};
