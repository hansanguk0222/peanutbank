import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAccountBookState, IAccountBook } from '@/src/type/store';
import { Status } from '@/src/utils/constants';

export const accountBookState: IAccountBookState = {
  accountBookInfo: null,
  errMessage: null,
  loading: false,
  status: null,
};

const accountBookSlice = createSlice({
  name: 'accountBook',
  initialState: accountBookState,
  reducers: {
    getAccountBookRequest(state, { payload }: PayloadAction<{ nickname: string; yyyy: number; mm: number }>) {
      state.loading = true;
      state.status = null;
      state.errMessage = null;
    },
    getAccountBookSuccess(state, { payload }: PayloadAction<{ accountBook: IAccountBook; status: typeof Status }>) {
      const { accountBook, status } = payload;
      state.loading = false;
      state.accountBookInfo = accountBook;
      state.status = status;
    },
    getAccountBookFailure(state, { payload }: PayloadAction<{ errMessage: string; status: typeof Status }>) {
      const { errMessage, status } = payload;
      state.status = status;
      state.errMessage = errMessage;
    },
    createLedgerRequest(state, { payload }: PayloadAction<{ id?: string; nickname: string; date: string; incomeOrExpenditure: string; amount: number; category: string; description: string }>) {
      state.loading = true;
      state.status = null;
      state.errMessage = null;
    },
    createLedgerSuccess(
      state,
      { payload }: PayloadAction<{ userId: string; id: string; date: string; incomeOrExpenditure: string; amount: number; categoryId: string; description: string; status: number }>
    ) {
      const { status, id, date, incomeOrExpenditure, amount, categoryId, description } = payload;

      const splitByDash = date.split('-');
      const yyyy = splitByDash[0];
      const mm = splitByDash[1];
      const dd = splitByDash[2];

      if (state.accountBookInfo === null) {
        state.accountBookInfo = {};
      }
      if (state.accountBookInfo[`${yyyy}-${mm}`] === undefined) {
        state.accountBookInfo[`${yyyy}-${mm}`] = { expenditure: {}, income: {}, allExpenditure: 0, allIncome: 0, maxExpenditure: 0, maxIncome: 0 };
      }
      if (state.accountBookInfo[`${yyyy}-${mm}`]['income'][dd] === undefined) {
        state.accountBookInfo[`${yyyy}-${mm}`]['income'][dd] = [];
      }
      if (state.accountBookInfo[`${yyyy}-${mm}`]['expenditure'][dd] === undefined) {
        state.accountBookInfo[`${yyyy}-${mm}`]['expenditure'][dd] = [];
      }

      state.accountBookInfo[`${yyyy}-${mm}`][incomeOrExpenditure][dd].push({ id, description, categoryId, amount });

      const nowAllIncome = state.accountBookInfo[`${yyyy}-${mm}`]['income'][dd].reduce((acc, cur) => {
        return acc + cur.amount;
      }, 0);

      const nowAllExpenditure = state.accountBookInfo[`${yyyy}-${mm}`]['expenditure'][dd].reduce((acc, cur) => {
        return acc + cur.amount;
      }, 0);

      state.accountBookInfo[`${yyyy}-${mm}`].allExpenditure += nowAllExpenditure;
      state.accountBookInfo[`${yyyy}-${mm}`].allIncome += nowAllIncome;
      state.accountBookInfo[`${yyyy}-${mm}`].maxExpenditure = Math.max(state.accountBookInfo[`${yyyy}-${mm}`].maxExpenditure, nowAllExpenditure);
      state.accountBookInfo[`${yyyy}-${mm}`].maxIncome = Math.max(state.accountBookInfo[`${yyyy}-${mm}`].maxIncome, nowAllIncome);
      state.loading = false;
      state.status = status;
    },
    createLedgerFailure(state, { payload }: PayloadAction<{ errMessage: string; status: typeof Status }>) {
      const { errMessage, status } = payload;
      state.status = status;
      state.errMessage = errMessage;
    },
  },
});

export const ACCOUNTBOOK = accountBookSlice.name;
export const { getAccountBookRequest, getAccountBookSuccess, getAccountBookFailure, createLedgerRequest, createLedgerSuccess, createLedgerFailure } = accountBookSlice.actions;

export default accountBookSlice.reducer;
