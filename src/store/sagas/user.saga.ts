import { put, all, fork, takeEvery, call, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  getUserInformByGoogleLoginRequest,
  getUserInformByGoogleLoginSuccess,
  getUserInformByGoogleLoginFailure,
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFailure,
} from '@/src/store/slices/user.slice';
import { ErrorMessage } from '@/src/utils/constants';
import { userService } from '@/src/services';

function* getUserInformByGoogleLogin(action: PayloadAction<{ idToken: string; oauthType: string; googleId: string }>) {
  try {
    const { idToken, oauthType, googleId } = action.payload;

    const { data, status } = yield call(userService.getUserInformByGoogleLogin, { idToken, oauthType, googleId });
    if (status === 200 || status === 201) {
      yield put(getUserInformByGoogleLoginSuccess({ status, userInfo: data }));
    }
  } catch (err) {
    yield put(getUserInformByGoogleLoginFailure({ status: 400, errMessage: ErrorMessage.INVALID_USER }));
  }
}

function* watchGetUserInformByGoogleLogin() {
  yield takeEvery(getUserInformByGoogleLoginRequest, getUserInformByGoogleLogin);
}

function* getUserInfo(action: PayloadAction<{ nickname: string }>) {
  try {
    const { nickname } = action.payload;

    const { data, status } = yield call(userService.getUserInformByToken, { nickname });
    if (status === 200) {
      yield put(getUserInfoSuccess({ status, userInfo: data }));
    }
  } catch (err) {
    yield put(getUserInfoFailure({ errMessage: ErrorMessage.INVALID_USER, status: 400 }));
  }
}

function* watchGetUserInfo() {
  yield takeEvery(getUserInfoRequest, getUserInfo);
}

export default function* userSaga() {
  yield all([fork(watchGetUserInformByGoogleLogin), fork(watchGetUserInfo)]);
}
