import { createStore } from 'redux';
import rootReducer from './reducers';

const configureStore = (preloadedState?: any) => {
  if (process.env.NODE_ENV === 'production') {
    return createStore(rootReducer, preloadedState);
  }

  return createStore(
    rootReducer,
    preloadedState,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  );
};

export default configureStore;
