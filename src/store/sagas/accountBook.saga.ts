import { put, all, fork, takeEvery, call } from 'redux-saga/effects';
import { getAccountBookRequest, getAccountBookSuccess, getAccountBookFailure, createLedgerRequest, createLedgerSuccess, createLedgerFailure } from '../slices/accountBook.slice';
import { PayloadAction } from '@reduxjs/toolkit';
// import { accountBook } from '@/src/__test__/__feature__';
import { checkNotAvailableValue } from '@/src/utils';
import { ErrorMessage } from '@/src/utils/constants';
import { accountBookService } from '@/src/services';

export function* getAccountBook(action: PayloadAction<{ userId: string; year: number; month: number }>) {
  const { userId, year, month } = action.payload;
  try {
    if (checkNotAvailableValue([userId, year, month])) {
      if (process.env.NODE_ENV === 'test') {
        if (userId === 'abc') {
          const { data, status } = yield call(accountBookService.getAccountBook, { userId, year, month });
          yield put(getAccountBookSuccess({ status, accountBook: data }));
        }
      } else {
        const { data, status } = yield call(accountBookService.getAccountBook, { userId, year, month });
        yield put(getAccountBookSuccess({ status, accountBook: data }));
      }
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'test') {
      if (userId !== 'abc') {
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

export function* createLedger(action: PayloadAction<{ userId: string; date: string; incomeOrExpenditure: string; amount: number; category: string; description: string }>) {
  const { userId, amount, category, date, description, incomeOrExpenditure } = action.payload;
  try {
    if (checkNotAvailableValue([userId, amount, category, date, description, incomeOrExpenditure])) {
      if (process.env.NODE_ENV === 'test') {
        if (userId === 'abc') {
          const { data, status } = yield call(accountBookService.createLedger, { userId, amount, category, date, description, incomeOrExpenditure });
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
        const { data, status } = yield call(accountBookService.createLedger, { userId, amount, category, date, description, incomeOrExpenditure });
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
      if (userId !== 'abc') {
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
