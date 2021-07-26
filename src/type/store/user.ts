import { Status } from '@/src/utils/constants';

export interface IUserInfo {
  nickname: string;
  oauthType: string;
  image: string;
}

export interface IUserState {
  loading: boolean;
  userInfo: IUserInfo | null;
  errMessage: null | string;
  status: typeof Status | null;
}
