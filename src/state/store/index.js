import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootSaga from '../sagas';
import rootReducer from '../reducers';

import middleware, { sagaMiddleware } from './middleware';

const reducer = persistReducer(
  {
    key: 'cropandupload',
    storage,
    whitelist: []
  },
  combineReducers({ ...rootReducer })
);
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configStore = (initialState = {}) => {
  const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(...middleware))
  );

  sagaMiddleware.run(rootSaga);
  return {
    persistor: persistStore(store),
    store
  };
};

const { store } = configStore();

global.store = store;

export { store };
