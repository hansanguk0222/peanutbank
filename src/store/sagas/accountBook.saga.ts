import { put, all, fork, takeEvery, call } from 'redux-saga/effects';
import { getAccountBookRequest, getAccountBookSuccess, getAccountBookFailure } from '../slices/accountBook.slice';
import { PayloadAction } from '@reduxjs/toolkit';
// import { accountBook } from '@/src/__test__/__feature__';
import { checkNotAvailableValue } from '@/src/utils';
import { ErrorMessage } from '@/src/utils/constants';
import { accountBookService } from '@/src/services';
import { accountBook } from '@/src/__test__/__feature__';
import axios from 'axios';

export function getPostAPI(postId) {
  console.log(postId);
  return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
}

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
        console.log(data, status);
      }
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'test') {
      console.log(err);
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

export default function* accountBookSaga() {
  yield all([fork(watchGetAccountBook)]);
}
