import * as ActionTypes from '../actions/types';

const INITIAL_STATE = {
  costoMase: 0,
  productos:[],
  error:''
};

function settingsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.LOAD_PRODUCTS_SUCCESS: {
      return {
        ...state,
        productos: action.productos
      }
    }
    case ActionTypes.LOAD_PRODUCTS_FAIL: {
      return {
        ...state,
        error: 'Error al cargar productos de BD'
      }
    }
    default:
      return state;
  }
}


export default settingsReducer;
