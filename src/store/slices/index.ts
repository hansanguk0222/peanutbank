import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from '@reduxjs/toolkit';
import { IAccountBookState } from '@/src/type/store';
import accountBookSlice, { ACCOUNTBOOK } from './accountBook.slice';

const rootReducer = combineReducers({
  [ACCOUNTBOOK]: accountBookSlice,
});

export interface State {
  accountBook: IAccountBookState;
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
