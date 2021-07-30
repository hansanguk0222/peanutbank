import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategoryState, ICategory } from '@/src/type/store';
import { Status } from '@/src/utils/constants';

export const categoryState: ICategoryState = {
  categories: null,
  errMessage: null,
  loading: false,
  status: null,
};

const categorySlice = createSlice({
  name: 'category',
  initialState: categoryState,
  reducers: {
    getCategoryRequest(state, { payload }: PayloadAction<{ nickname: string }>) {
      console.log(payload);
      state.loading = true;
      state.status = null;
      state.errMessage = null;
    },
    getCategorySuccess(state, { payload }: PayloadAction<{ categories: ICategory[]; status: number }>) {
      const { categories, status } = payload;
      state.categories = categories;
      state.status = status;
      state.loading = false;
    },
    getCategoryFailure(state, { payload }: PayloadAction<{ errMessage: string; status: typeof Status }>) {
      const { status, errMessage } = payload;
      state.errMessage = errMessage;
      state.loading = false;
      state.status = status;
    },
  },
});

export const CATEGORY = categorySlice.name;
export const { getCategoryRequest, getCategorySuccess, getCategoryFailure } = categorySlice.actions;
export default categorySlice.reducer;
