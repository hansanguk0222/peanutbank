import axios from 'axios';

const API = axios.create({ timeout: 9000, withCredentials: true });
const serverUrl = process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_DEV_SERVER_URL : process.env.NEXT_PUBLIC_PRO_SERVER_URL;
API.defaults.headers = { crossDomain: true, 'Content-Type': 'application/json' };

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
