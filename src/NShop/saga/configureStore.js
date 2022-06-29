// #redux
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// #reducer
import rootReducer from '../reducer/rootReducer';

// #persist
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'// defaults to localStorage for web

// #thunk
import thunk from 'redux-thunk';

// #saga
import createSagaMiddleware from '@redux-saga/core';//watcher
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware()

// #persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  // blacklist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const middlewares = [thunk, sagaMiddleware]

export default () => {
  let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middlewares)))
  let persistor = persistStore(store)
  // run watcher
  sagaMiddleware.run(rootSaga)
  return { store, persistor }
}