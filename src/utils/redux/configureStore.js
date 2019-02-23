import thunkMiddleware from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';

import loggerMiddleware from './logger';
import monitorReducerEnhancer from './monitorReducer';
import rootReducer from '../../reducers/index';

 const configureStore = preloadedState => {
  const middlewares = [loggerMiddleware, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducerEnhancer]

  const composeEnhancersDevTool = process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: 'MyApp', actionsBlacklist: ['REDUX_STORAGE_SAVE']
      }) : compose;

  const composeEnhancers = composeEnhancersDevTool(
    ...enhancers
    // other store enhancers if any
  );

  const store = createStore(rootReducer, preloadedState, composeEnhancers)

  return store
};

export default configureStore;