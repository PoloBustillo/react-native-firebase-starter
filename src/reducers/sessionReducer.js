import * as ActionTypes from '../actions/types';

const INITIAL_STATE = {
  user: null,
  isAdmin:false,
  tortillerias:[],
  error:''
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
    case ActionTypes.LOGIN_USER_FAIL: {
      return {
        ...state,
        error:'Error al cargar usuario'
      }
    }
    case ActionTypes.LOAD_TORTILLERIAS_SUCCESS: {
      return {
        ...state,
        tortillerias: action.tortillerias
      }
    }
    case ActionTypes.LOAD_TORTILLERIAS_FAIL: {
      return {
        ...state,
        error:'Error al cargar tortillerias'
      }
    }
    default:
      return state;
  }
}

export default sessionReducer;
