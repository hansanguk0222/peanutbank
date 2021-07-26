import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers = { crossDomain: true, 'Content-Type': 'application/json' };

interface IUserService {
  getUserInformByGoogleLogin: ({ idToken, oauthType, googleId }: { idToken: string; oauthType: string; googleId: string }) => void;
  getUserInformByToken: ({ token, tokenType }: { token: string; tokenType: string }) => void;
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
  getUserInformByToken({ token, tokenType }: { token: string; tokenType: string }) {
    if (process.env.NODE_ENV === 'development') {
      return axios.get(`${process.env.NEXT_PUBLIC_DEV_SERVER_URL}/users/auth/token/${tokenType}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } else {
      return axios.get(`${process.env.NEXT_PUBLIC_PRO_SERVER_URL}/users/auth/token/${tokenType}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    }
  },
};
