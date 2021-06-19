import ACTION_TYPES from 'core/redux/actions/actionTypes';
import updateState from './utility';

const { SET_CURRENT_POST } = ACTION_TYPES;

// CURRENT POST
export const currentPostReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_POST:
      return updateState(state, payload);

    default:
      return state;
  }
};
