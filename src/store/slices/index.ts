// /lib/slices/index.js
import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from '@reduxjs/toolkit';

import testSlice, { TEST, TestState } from './test.slice';

const rootReducer = combineReducers({
  [TEST]: testSlice,
});

export interface State {
  test: TestState;
}

export type RootState = ReturnType<typeof rootReducer>;

export const reducer = (state: State | undefined, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return rootReducer(state, action);
};

export default rootReducer;
