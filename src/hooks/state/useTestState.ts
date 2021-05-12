import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/src/store/slices';

const selectTest = createSelector(
  (state: RootState) => state.test,
  (test) => test
);

const useTestState = () => useSelector(selectTest);

export { useTestState };
