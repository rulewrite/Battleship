import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import creator from './middleware/creator';

const configureStore = (preloadedState?: any) => {
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
