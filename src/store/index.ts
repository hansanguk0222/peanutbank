/* eslint-disable @typescript-eslint/no-var-requires */
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { reducer } from './slices';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { createStore, applyMiddleware, Middleware, StoreEnhancer } from 'redux';
import { Store } from 'redux';
import { Task } from 'redux-saga';

export interface SagaStore extends Store {
  sagaTask: Task;
}

const bindMiddleware = (middleware: Middleware[]): StoreEnhancer => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore: MakeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  const store = createStore(reducer, {}, bindMiddleware([...middlewares]));
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper(makeStore);
