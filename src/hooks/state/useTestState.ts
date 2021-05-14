import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { CombinedState, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/src/store/slices';
import { TestState } from '@/src/store/slices/test.slice';

const selectTest = createSelector(
  (state: RootState) => state.test,
  (test) => test
);

const useTestState: CombinedState<() => TestState> = () => useSelector(selectTest);

export { useTestState };
