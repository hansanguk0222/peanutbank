import { put, all, call, take, fork, takeEvery } from 'redux-saga/effects';
import {
  getJsonDataRequest,
  getJsonDataSuccess,
  getJsonDataFailure,
  updateJsonDataRequest,
  updateJsonDataSuccess,
  updateJsonDataFailure,
} from '../slices/test.slice';
import { testService } from '@/src/services';
import { PayloadAction } from '@reduxjs/toolkit';

function* getJsonData(action: PayloadAction<{ num: number }>) {
  try {
    const { num } = action.payload;
    const { data, status } = yield call(testService.getJsonData, { num });
    if (status === 200) {
      yield put(getJsonDataSuccess({ res: data }));
    }
  } catch (err) {
    yield put(getJsonDataFailure({ err }));
  }
}

function* watchGetJsonData() {
  yield takeEvery(getJsonDataRequest, getJsonData);
}

function* updateJsonData(
  action: PayloadAction<{ id: number; title: string; body: string; userId: number }>
) {
  try {
    const { id, title, body, userId } = action.payload;
    const { data, status } = yield call(testService.updateJsonData, { id, title, body, userId });
    if (status === 200) {
      yield put(updateJsonDataSuccess({ id, body, title, userId }));
    }
  } catch (err) {
    yield put(updateJsonDataFailure({ err }));
  }
}

function* watchUpdateJsonData() {
  yield takeEvery(updateJsonDataRequest, updateJsonData);
}

export default function* testSaga() {
  yield all([fork(watchGetJsonData), fork(watchUpdateJsonData)]);
}
