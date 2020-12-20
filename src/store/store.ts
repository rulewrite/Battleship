import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = (preloadedState?: any) => {
  const middleware = applyMiddleware(thunk);

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
