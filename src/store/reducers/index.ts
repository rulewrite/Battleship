import { Action } from '@Actions';
import { combineReducers } from 'redux-immutable';
import fleet from './fleet';

export interface State {
  [stateKey: string]: any;
}

const rootReducer = combineReducers<State, Action>({
  fleet,
});

export default rootReducer;
