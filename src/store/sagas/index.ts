import { all, fork } from 'redux-saga/effects';
import testSaga from './test.saga';

export default function* rootSaga() {
  yield all([fork(testSaga)]);
}
