import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAccountBookState, IAccountBook } from '@/src/type/store';
import { Status } from '@/src/utils/constants';

const accountBookState: IAccountBookState = {
  accountBook: null,
  errMessage: null,
  loading: false,
  status: null,
};

const accountBookSlice = createSlice({
  name: 'accountBook',
  initialState: accountBookState,
  reducers: {
    getAccountBookRequest(state, { payload }: PayloadAction<{ userId: string; year: number; month: number }>) {
      state.loading = true;
      state.status = null;
      state.errMessage = null;
    },
    getAccountBookSuccess(state, { payload }: PayloadAction<{ accountBook: IAccountBook; status: typeof Status }>) {
      const { accountBook, status } = payload;
      state.loading = false;
      state.accountBook = accountBook;
      state.status = status;
    },
    getAccountBookFailure(state, { payload }: PayloadAction<{ errMessage: string; status: typeof Status }>) {
      const { errMessage, status } = payload;
      state.status = status;
      state.errMessage = errMessage;
    },
  },
});

export const ACCOUNTBOOK = accountBookSlice.name;
export const { getAccountBookRequest, getAccountBookSuccess, getAccountBookFailure } = accountBookSlice.actions;

export default accountBookSlice.reducer;
