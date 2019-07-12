import { combineReducers } from 'redux'
import settingsReducer from './settingsReducer';
import sessionReducer from './sessionReducer';

export default combineReducers({settingsReducer,sessionReducer})
