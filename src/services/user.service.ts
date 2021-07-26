import axios from 'axios';
import API from './API';

axios.defaults.withCredentials = true;
axios.defaults.headers = { crossDomain: true, 'Content-Type': 'application/json' };

interface IUserService {
  getUserInformByGoogleLogin: ({ idToken, oauthType, googleId }: { idToken: string; oauthType: string; googleId: string }) => void;
  getUserInformByToken: ({ nickname }: { nickname: string }) => void;
}

export const userService: IUserService = {
  getUserInformByGoogleLogin({ idToken, oauthType, googleId }: { idToken: string; oauthType: string; googleId: string }) {
    if (process.env.NODE_ENV === 'development') {
      return axios.post(
        `${process.env.NEXT_PUBLIC_DEV_SERVER_URL}/users/login/${oauthType}`,
        {
          googleId,
        },
        {
          headers: {
            authorization: `Bearer ${idToken}`,
          },
        }
      );
    } else {
      return axios.post(
        `${process.env.NEXT_PUBLIC_PRO_SERVER_URL}/users/login/${oauthType}`,
        {
          googleId,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
    }
  },
  getUserInformByToken({ nickname }: { nickname: string }) {
    if (process.env.NODE_ENV === 'development') {
      return API.get(`${process.env.NEXT_PUBLIC_DEV_SERVER_URL}/users/${nickname}`);
    } else {
      return API.get(`${process.env.NEXT_PUBLIC_PRO_SERVER_URL}/users/${nickname}`);
    }
  },
};
