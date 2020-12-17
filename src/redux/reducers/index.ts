import { combineReducers } from 'redux-immutable';
import board from './board';

const rootReducer = combineReducers({
  board,
});

export default rootReducer;
