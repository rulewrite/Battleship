import { combineReducers } from 'redux-immutable';
import fleet from './fleet';

const rootReducer = combineReducers({
  fleet,
});

export default rootReducer;
