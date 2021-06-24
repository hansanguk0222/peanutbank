import { useSelector } from 'react-redux';
import { CombinedState, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/src/store/slices';
import { IAccountBookState } from '@/src/type/store';

const selectAccountBook = createSelector(
  (state: RootState) => state.accountBook,
  (accountBook) => accountBook
);

const useAccountBookState: CombinedState<() => IAccountBookState> = () => useSelector(selectAccountBook);

export { useAccountBookState };
