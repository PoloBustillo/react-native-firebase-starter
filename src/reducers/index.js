import { combineReducers } from 'redux'
import sessionReducer from './Session';
import modalsReducer from './ModalsReducer';

export default combineReducers({sessionReducer, modalsReducer})
