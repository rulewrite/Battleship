import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer, { State } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import creator from '@Creator';

const configureStore = (preloadedState?: State) => {
  const middleware = applyMiddleware(thunk, creator);

  if (process.env.NODE_ENV === 'production') {
    return createStore(rootReducer, preloadedState, middleware);
  }

  return createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(middleware)
  );
};

export default configureStore;
