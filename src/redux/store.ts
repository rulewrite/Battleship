import { createStore } from 'redux';
import rootReducer from './reducers';

const configureStore = (preloadedState?: any) =>
  createStore(rootReducer, preloadedState);

export default configureStore;
