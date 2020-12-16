import { combineReducers } from 'redux';

const test = (state = { test: 1 }, action: { type: string }) => {
  return state;
};

const rootReducer = combineReducers({
  test,
});

export default rootReducer;
