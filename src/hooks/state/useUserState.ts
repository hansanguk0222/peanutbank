import { useSelector } from 'react-redux';
import { CombinedState, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/src/store/slices';
import { IUserState } from '@/src/type/store';

const selectUser = createSelector(
  (state: RootState) => state.user,
  (user) => user
);

const useUserState: CombinedState<() => IUserState> = () => useSelector(selectUser);

export { useUserState };
