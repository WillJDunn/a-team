import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import { createLogger } from 'redux-logger';
import { Iterable } from 'immutable';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

const logger = createLogger({
  stateTransformer: (state) => {
    let newState = {};

    for (let i of Object.keys(state)) {
      if (Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    }
    return newState;
  }
});

const configureAppStore = (preloadedState) => {
  // const middlewares = [...getDefaultMiddleware(), thunk];
  const middlewares = [thunk];
  if (process.env.NODE_ENV === `development`) {
    middlewares.push(logger);
  }
  const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    preloadedState,
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducers/rootReducer', () => store.replaceReducer(rootReducer))
  }
  window.store = store;
  return store
};

export default configureAppStore;
