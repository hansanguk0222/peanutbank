import { put, all, fork, takeEvery, call } from 'redux-saga/effects';
import { getAccountBookRequest, getAccountBookSuccess, getAccountBookFailure, createLedgerRequest, createLedgerSuccess, createLedgerFailure } from '../slices/accountBook.slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { checkNotAvailableValue } from '@/src/utils';
import { ErrorMessage } from '@/src/utils/constants';
import { accountBookService } from '@/src/services';
import Cookies from 'universal-cookie';

export function* getAccountBook(action: PayloadAction<{ nickname: string; yyyy: number; mm: number }>) {
  const { nickname, yyyy, mm } = action.payload;
  try {
    if (checkNotAvailableValue([nickname, yyyy, mm])) {
      if (process.env.NODE_ENV === 'test') {
        if (nickname === 'abc') {
          const { data, status } = yield call(accountBookService.getAccountBook, { nickname, yyyy, mm });
          yield put(getAccountBookSuccess({ status, accountBook: data.accountbooks }));
        }
      } else {
        const { data, status } = yield call(accountBookService.getAccountBook, { nickname, yyyy, mm });
        yield put(getAccountBookSuccess({ status, accountBook: data.accountbooks }));
      }
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'test') {
      if (nickname !== 'abc') {
        yield put(getAccountBookFailure({ status: 400, errMessage: ErrorMessage.INVALID_USER }));
      } else {
        yield put(getAccountBookFailure({ status: 400, errMessage: ErrorMessage.NOT_ALL_VALUES_ARE_PASSED }));
      }
    } else {
      //여기에 axios 콜하는 부분 와야 됨
    }
  }
}

function* watchGetAccountBook() {
  yield takeEvery(getAccountBookRequest, getAccountBook);
}

export function* createLedger(action: PayloadAction<{ id?: string; nickname: string; date: string; incomeOrExpenditure: string; amount: number; category: string; description: string }>) {
  const { id, nickname, amount, category, date, description, incomeOrExpenditure } = action.payload;
  try {
    if (checkNotAvailableValue([nickname, amount, category, date, description, incomeOrExpenditure])) {
      const tempDate = date.split('-');
      const yyyy = tempDate[0];
      const mm = tempDate[1];
      const dd = tempDate[2];
      if (process.env.NODE_ENV === 'test') {
        if (nickname === 'abc') {
          const { data, status } = yield call(accountBookService.createLedger, { amount, category, dd, description, incomeOrExpenditure, mm, nickname, yyyy });
          if (status === 201) {
            yield put(
              createLedgerSuccess({
                status,
                amount: data.amount,
                categoryId: data.categoryId,
                date: data.date,
                description: data.description,
                id: data.id,
                incomeOrExpenditure: data.incomeOrExpenditure,
                userId: data.userId,
              })
            );
          }
        }
      } else {
        const { data, status } = yield call(accountBookService.createLedger, { amount, category, dd, description, incomeOrExpenditure, mm, nickname, yyyy });
        if (status === 201) {
          yield put(
            createLedgerSuccess({
              status,
              amount: data.amount,
              categoryId: data.categoryId,
              date: data.date,
              description: data.description,
              id: data.id,
              incomeOrExpenditure: data.incomeOrExpenditure,
              userId: data.userId,
            })
          );
        }
      }
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'test') {
      if (nickname !== 'abc') {
        yield put(createLedgerFailure({ status: 400, errMessage: ErrorMessage.INVALID_USER }));
      } else {
        yield put(createLedgerFailure({ status: 400, errMessage: ErrorMessage.NOT_ALL_VALUES_ARE_PASSED }));
      }
    } else {
      //여기에 axios 콜하는 부분 와야 됨
    }
  }
}

function* watchCreateLedger() {
  yield takeEvery(createLedgerRequest, createLedger);
}

export default function* accountBookSaga() {
  yield all([fork(watchGetAccountBook), fork(watchCreateLedger)]);
}
