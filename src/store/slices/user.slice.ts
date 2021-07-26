import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserInfo, IUserState } from '@/src/type/store';
import { Status } from '@/src/utils/constants';

export const userState: IUserState = {
  errMessage: null,
  loading: false,
  status: null,
  userInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    getUserInformByGoogleLoginRequest(state, { payload }: PayloadAction<{ idToken: string; oauthType: string; googleId: string }>) {
      state.loading = true;
      state.status = null;
      state.errMessage = null;
    },
    getUserInformByGoogleLoginSuccess(state, { payload }: PayloadAction<{ status: typeof Status; userInfo: IUserInfo }>) {
      const { status, userInfo } = payload;
      state.userInfo = userInfo;
      state.status = status;
      state.errMessage = null;
      state.loading = false;
    },
    getUserInformByGoogleLoginFailure(state, { payload }: PayloadAction<{ status: typeof Status; errMessage: string }>) {
      const { errMessage, status } = payload;
      state.status = status;
      state.errMessage = errMessage;
      state.loading = false;
    },
    getUserInfoRequest(state, { payload }: PayloadAction<{ nickname: string }>) {
      state.loading = true;
      state.status = null;
      state.errMessage = null;
    },
    getUserInfoSuccess(state, { payload }: PayloadAction<{ status: typeof Status; userInfo: IUserInfo }>) {
      const { status, userInfo } = payload;
      console.log(userInfo);
      state.userInfo = userInfo;
      state.status = status;
      state.errMessage = null;
      state.loading = false;
    },
    getUserInfoFailure(state, { payload }: PayloadAction<{ status: typeof Status; errMessage: string }>) {
      const { errMessage, status } = payload;
      state.status = status;
      state.errMessage = errMessage;
      state.loading = false;
    },
  },
});

export const USER = userSlice.name;
export const { getUserInformByGoogleLoginRequest, getUserInformByGoogleLoginSuccess, getUserInformByGoogleLoginFailure, getUserInfoRequest, getUserInfoSuccess, getUserInfoFailure } =
  userSlice.actions;
export default userSlice.reducer;
