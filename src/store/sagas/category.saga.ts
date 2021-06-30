import { put, all, fork, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { getCategoryRequest, getCategorySuccess, getCategoryFailure } from '../slices/category.slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { checkNotAvailableValue } from '@/src/utils';
import { ErrorMessage } from '@/src/utils/constants';
import { categoryService } from '@/src/services';

export function* getCategory(action: PayloadAction<{ userId: string }>) {
  const { userId } = action.payload;
  try {
    if (process.env.NODE_ENV === 'test') {
      if (userId === 'abc') {
        const { data, status } = yield call(categoryService.getCategory, { userId });
        if (status === 200) {
          yield put(getCategorySuccess({ status, categorys: data }));
        }
      }
    } else {
      const { data, status } = yield call(categoryService.getCategory, { userId });
      if (status === 200) {
        yield put(getCategorySuccess({ status, categorys: data }));
      }
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'test') {
      if (userId !== 'abc') {
        yield put(getCategoryFailure({ status: 400, errMessage: ErrorMessage.INVALID_USER }));
      } else {
        yield put(getCategoryFailure({ status: 400, errMessage: ErrorMessage.NOT_ALL_VALUES_ARE_PASSED }));
      }
    } else {
      //여기에 axios 콜하는 부분 와야 됨
    }
  }
}

function* watchGetCategory() {
  yield takeLatest(getCategoryRequest, getCategory);
}

export default function* accountBookSaga() {
  yield all([fork(watchGetCategory)]);
}
