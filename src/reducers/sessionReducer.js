import * as ActionTypes from '../actions/types';

const INITIAL_STATE = {
  user: null,
  isAdmin:false
};


function sessionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_USER_SUCCESS: {
      return {
        ...state,
        isAdmin: action.isAdmin,
        user: action.payload
      }
    }
    default:
      return state;
  }
}

export default sessionReducer;
