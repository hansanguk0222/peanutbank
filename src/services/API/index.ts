import axios from 'axios';
import { isVerifiedToken } from '@/src/utils';
import Cookies from 'universal-cookie';
const API = axios.create({ timeout: 9000, withCredentials: true });
const serverUrl = process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_DEV_SERVER_URL : process.env.NEXT_PUBLIC_PRO_SERVER_URL;
API.defaults.headers = { crossDomain: true, 'Content-Type': 'application/json' };

API.interceptors.request.use(
  async (config) => {
    const cookieStr = API.defaults.headers.cookie as string;
    const cookies = cookieStr.split('; ');
    let accessToken, refreshToken, nickname;
    cookies.map((cookie) => {
      if (cookie.startsWith('accessToken=')) {
        accessToken = cookie.slice(12);
      } else if (cookie.startsWith('refreshToken=')) {
        refreshToken = cookie.slice(13);
      } else if (cookie.startsWith('nickname=')) {
        nickname = cookie.slice(9);
      }
    });
    console.log(accessToken, refreshToken, nickname);
    try {
      await isVerifiedToken({ token: accessToken, type: 'accessToken' });
      return {
        ...config,
        headers: { ...config.headers, Authorization: `Bearer ${accessToken}` },
      };
    } catch (err) {
      try {
        axios.defaults.headers.cookie = `refreshToken=${refreshToken}; nickname=${nickname}`;
        const { data } = await axios.get(`http://localhost:8080/users/token/refresh`);
        API.defaults.headers.cookie += `; accessToken=${data.accessToken};`;
        const cookies = new Cookies();
        cookies.set('accessToken', data.accessToken, {
          maxAge: 5 * 60 * 1000,
          httpOnly: true,
        });
        return {
          ...config,
          headers: { ...config.headers, Authorization: `Bearer ${data.accessToken}` },
        };
      } catch (error) {
        API.defaults.headers.cookie = '';
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

API.interceptors.response.use(
  (res) => {
    if (res.status >= 400) {
      console.error('api 요청 실패', res);
    }
    return res;
  },
  (err) => {
    if (axios.isCancel(err)) {
      console.error('요청 취소', err);
    } else {
      if (err?.response?.status === 401) {
        const { url } = err.respnose.config;
        if (url !== `${serverUrl}/users/login`) {
          API.defaults.headers.cookie = '';
        }
      }
      console.error('api 에러', err);
    }
    return Promise.reject(err);
  }
);

export default API;
