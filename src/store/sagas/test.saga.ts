import { put, all, call, take, fork, takeEvery } from 'redux-saga/effects';
import { jsonDataRequest, jsonDataSuccess, jsonDataFailure } from '../slices/test.slice';
import { testService } from '@/src/services';
import { PayloadAction } from '@reduxjs/toolkit';

function* jsonData(action: PayloadAction<{ num: number }>) {
  try {
    const { num } = action.payload;
    const { data, status } = yield call(testService.jsonData, { num });
    if (status === 200) {
      console.log(data);
      yield put(jsonDataSuccess({ res: data }));
    }
  } catch (err) {
    yield put(jsonDataFailure({ err }));
  }
}

function* watchJsonData() {
  yield takeEvery(jsonDataRequest, jsonData);
}

export default function* testSaga() {
  yield all([fork(watchJsonData)]);
}
