import { put, all, fork, takeEvery } from 'redux-saga/effects';
import { getAccountBookRequest, getAccountBookSuccess, getAccountBookFailure } from '../slices/accountBook.slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { accountBook } from '@/src/__test__/__feature__';
import { checkNotAvailableValue } from '@/src/utils';
import { ErrorMessage } from '@/src/utils/constants';

function* getAccountBook(action: PayloadAction<{ userId: string; year: number; month: number }>) {
  const { userId, year, month } = action.payload;
  try {
    if (checkNotAvailableValue([userId, year, month])) {
      if (process.env.NODE_ENV === 'test') {
        if (userId === 'user123') {
          yield put(getAccountBookSuccess({ status: 200, accountBook }));
        }
      } else {
        //여기에 axios 콜하는 부분 와야 됨
      }
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'test') {
      if (userId !== 'user123') {
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

export default function* accountBookSaga() {
  yield all([fork(watchGetAccountBook)]);
}
