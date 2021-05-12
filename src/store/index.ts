import { createWrapper } from 'next-redux-wrapper';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { compose, applyMiddleware, createStore } from 'redux';
import rootReducer from '@/src/store/slices';

const configureStore = () => {
  const logger = createLogger();
  const enhancer = compose(composeWithDevTools(applyMiddleware(logger)));
  const store = createStore(rootReducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, { debug: true });

export default wrapper;
