import axios from 'axios';
import { isVerifiedToken } from '@/src/utils';
import Cookies from 'universal-cookie';

const API = axios.create({ timeout: 9000 });
const serverUrl = process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_DEV_SERVER_URL : process.env.NEXT_PUBLIC_PRO_SERVER_URL;
API.defaults.withCredentials = true;
// API.defaults.headers = { crossDomain: true, 'Content-Type': 'application/json' };

API.interceptors.request.use(
  async (config) => {
    const cookies = new Cookies();
    const accessToken = cookies.get('accessToken');
    if (accessToken) {
      try {
        await isVerifiedToken({ token: accessToken, type: 'accessToken' });
        return {
          ...config,
          headers: { ...config.headers, Authorization: `Bearer ${accessToken}` },
        };
      } catch (err) {
        const refreshToken = cookies.get('refreshToken');
        if (refreshToken) {
          try {
            const { status } = await axios.get(`${serverUrl}/users/auth/token/refresh`);
            if (status === 200) {
              const accessToken = cookies.get('accessToken');
              return {
                ...config,
                headers: { ...config.headers, Authorization: `Bearer ${accessToken}` },
              };
            }
          } catch (err) {
            if (err.response.status === 401) {
              cookies.remove('accessToken');
              cookies.remove('refreshToken');
              window.location.href = '/login';
            }
          }
        }
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
          window.location.href = '/login';
        }
      }
      console.error('api 에러', err);
    }
    return Promise.reject(err);
  }
);

export default API;
