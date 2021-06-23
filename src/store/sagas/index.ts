import { all, fork } from 'redux-saga/effects';
import accountBookSaga from './accountBook.saga';

export default function* rootSaga() {
  yield all([fork(accountBookSaga)]);
}
