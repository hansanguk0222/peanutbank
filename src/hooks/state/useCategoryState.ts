import { useSelector } from 'react-redux';
import { CombinedState, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/src/store/slices';
import { ICategoryState } from '@/src/type/store';

const selectCategory = createSelector(
  (state: RootState) => state.category,
  (category) => category
);

const useCategoryState: CombinedState<() => ICategoryState> = () => useSelector(selectCategory);

export { useCategoryState };
