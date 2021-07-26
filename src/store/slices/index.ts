import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from '@reduxjs/toolkit';
import { IAccountBookState, ICategoryState, IUserState } from '@/src/type/store';
import accountBookSlice, { ACCOUNTBOOK } from './accountBook.slice';
import categorySlice, { CATEGORY } from './category.slice';
import userSlice, { USER } from './user.slice';

const rootReducer = combineReducers({
  [ACCOUNTBOOK]: accountBookSlice,
  [CATEGORY]: categorySlice,
  [USER]: userSlice,
});

export interface State {
  accountBook: IAccountBookState;
  category: ICategoryState;
  user: IUserState;
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
