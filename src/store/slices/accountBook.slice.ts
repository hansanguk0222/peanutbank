import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAccountBookState, IAccountBook } from '@/src/type/store';
import { Status } from '@/src/utils/constants';

export const accountBookState: IAccountBookState = {
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
    createLedgerRequest(state, { payload }: PayloadAction<{ userId: string; date: string; incomeOrExpenditure: string; amount: number; category: string; discription: string }>) {
      state.loading = true;
      state.status = null;
      state.errMessage = null;
    },
    createLedgerSuccess(
      state,
      { payload }: PayloadAction<{ userId: string; id: string; date: string; incomeOrExpenditure: string; amount: number; categoryId: string; discription: string; status: number }>
    ) {
      const { status, id, date, incomeOrExpenditure, amount, categoryId, discription } = payload;
      const splitByDash = date.split('-');
      const yyyy = splitByDash[0];
      const mm = splitByDash[1];
      const dd = splitByDash[2];
      if (state.accountBook === null) {
        state.accountBook = {};
      }
      if (state.accountBook[`${yyyy}-${mm}`] === undefined) {
        state.accountBook[`${yyyy}-${mm}`] = { expenditure: {}, income: {}, allExpenditure: 0, allIncome: 0, maxExpenditure: 0, maxIncome: 0 };
        if (state.accountBook[`${yyyy}-${mm}`]['income'][dd] === undefined) {
          state.accountBook[`${yyyy}-${mm}`]['income'][dd] = [];
        }
        if (state.accountBook[`${yyyy}-${mm}`]['expenditure'][dd] === undefined) {
          state.accountBook[`${yyyy}-${mm}`]['expenditure'][dd] = [];
        }
      }
      state.accountBook[`${yyyy}-${mm}`][incomeOrExpenditure][dd].push({ id, discription, categoryId, amount });

      const nowAllIncome = state.accountBook[`${yyyy}-${mm}`]['income'][dd].reduce((acc, cur) => {
        return acc + cur.amount;
      }, 0);
      const nowAllExpenditure = state.accountBook[`${yyyy}-${mm}`]['expenditure'][dd].reduce((acc, cur) => {
        return acc + cur.amount;
      }, 0);
      state.accountBook[`${yyyy}-${mm}`].allExpenditure += nowAllExpenditure;
      state.accountBook[`${yyyy}-${mm}`].allIncome += nowAllIncome;
      state.accountBook[`${yyyy}-${mm}`].maxExpenditure = Math.max(state.accountBook[`${yyyy}-${mm}`].maxExpenditure, nowAllExpenditure);
      state.accountBook[`${yyyy}-${mm}`].maxIncome = Math.max(state.accountBook[`${yyyy}-${mm}`].maxIncome, nowAllIncome);
      state.loading = false;
      state.status = status;
    },
    createLedgerFailure(state, { payload }: PayloadAction<{ errMessage: string; status: typeof Status }>) {
      //주석 테스트2
      const { errMessage, status } = payload;
      state.status = status;
      state.errMessage = errMessage;
    },
  },
});

export const ACCOUNTBOOK = accountBookSlice.name;
export const { getAccountBookRequest, getAccountBookSuccess, getAccountBookFailure, createLedgerRequest, createLedgerSuccess, createLedgerFailure } = accountBookSlice.actions;

export default accountBookSlice.reducer;
