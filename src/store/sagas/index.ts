import { all, fork } from 'redux-saga/effects';
import accountBookSaga from './accountBook.saga';
import categorySaga from './category.saga';
import userSaga from './user.saga';
export default function* rootSaga() {
  yield all([fork(accountBookSaga), fork(categorySaga), fork(userSaga)]);
}
